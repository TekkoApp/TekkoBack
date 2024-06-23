import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: Partial<User>): Promise<User> {
    if (!user.password) {
      throw new BadRequestException('Password is required');
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = this.userRepository.create({ ...user, password: hashedPassword });
    return this.userRepository.save(newUser);
  }

  async createSocialUser(user: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async update(id: string, user: Partial<User>): Promise<void> {
    await this.userRepository.update(id, user);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
