// src/user/auth.controller.ts
import { Controller, Post, Body, Get, UseGuards, Request, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string; user: { email: string } }> {
    try {
      return await this.userService.login(loginDto);
    } catch (error) {
      throw new UnauthorizedException('Invalid login credentials');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req): Promise<{ email: string; createdAt: Date }> {
    try {
      return this.userService.getUserProfile(req.user.userId);
    } catch (error) {
      throw new ForbiddenException('Access denied or token expired');
    }
  }
}
