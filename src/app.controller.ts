import { Controller, Get, UseGuards } from '@nestjs/common';
import { RolesGuard } from './modules/auth/roles.guard';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { Roles } from './modules/auth/roles.decorator';
import { UserRole } from './modules/user/enumerations/user.enum';


@Controller('app')
export class AppController {
  @Get('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  getAdminData() {
    return 'Admin data';
  }

  @Get('cliente')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CLIENT)
  getClientData() {
    return 'Client data';
  }

  @Get('proveedor')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.PROVIDER)
  getProveedorData() {
    return 'Proveedor data';
  }
}
