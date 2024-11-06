import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<{ message: string }> {
    const message = await this.userService.register(registerDto);
    return { message };
  }

  // @Post('login')
  // async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
  //   return this.userService.login(loginDto);
  // }
}

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string; user: { email: string } }> {
    return this.userService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req): Promise<{ email: string; createdAt: Date }> {
    return this.userService.getUserProfile(req.user.userId);
  }
}