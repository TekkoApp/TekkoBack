import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';
import { UserRole } from '../user/enumerations/user.enum';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService, // Inyecta ConfigService
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async getProfile(id: string) {
    return await this.userService.findOne(id)
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async loginWithEmail(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.login(user);5
  }

  async googleLogin(token) {
    try {
      console.log("Token recibido en googleLogin:", token); // Log for debugging

      const ticket = await this.googleClient.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();

      if (!payload || !payload.email) {
        throw new UnauthorizedException('Invalid Google token');
      }

      try {
        const user = await this.userService.findByEmail(payload.email);
        return this.login(user); 
      } catch (error) {
        if (error instanceof NotFoundException) {
          const newUser = await this.userService.createSocialUser({
            email: payload.email,
            createdBy:'system',
            createdDate:new Date(),
            firstName: payload.given_name || '',
            lastName: payload.family_name || '',
            password: '', 
            role: UserRole.CLIENT, 
          });
          return this.login(newUser); 
        } else {
          throw error;
        }
      }
    } catch (error) {
      console.error('Error al verificar el token de Google:', error); // Log for debugging
      throw new UnauthorizedException('Error verifying Google token');
    }
  }


  async facebookLogin(accessToken: string, userID: string) {
    const url = `https://graph.facebook.com/v11.0/${userID}?fields=id,name,email&access_token=${accessToken}`;
    const response = await axios.get(url);
    const data = response.data;
    const user = await this.userService.findByEmail(data.email);
    if (user) {
      return this.login(user);
    } else {
      const [firstName, lastName] = data.name.split(' ');
      const newUser = await this.userService.create({
        email: data.email,
        firstName,
        lastName,
        password: '', // Set an empty password as it's a social login
        role: UserRole.CLIENT, // Default role
      });
      return this.login(newUser);
    }
  }

  private getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET'); // Accede a JWT_SECRET desde ConfigService
  }
}
