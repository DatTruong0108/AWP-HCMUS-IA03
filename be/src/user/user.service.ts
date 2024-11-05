// src/user/user.service.ts
import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from './schemas/user.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<string> {
    const { email, password } = registerDto;

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) throw new ConflictException('Email already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({ email, password: hashedPassword });

    try {
      await newUser.save();
      return 'User registered successfully';
    } catch (error) {
      throw new InternalServerErrorException('Error creating user');
    }
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string; user: { email: string } }> {
    const { email, password } = loginDto;
  
    console.log('Login attempt with email:', email);
    
    const user = await this.userModel.findOne({ email });
    if (!user) {
      console.log('User not found');
      throw new UnauthorizedException('Invalid email or password');
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Invalid password');
      throw new UnauthorizedException('Invalid email or password');
    }
  
    const payload = { userId: user._id, email: user.email };
    const accessToken = this.jwtService.sign(payload);
  
    console.log('Login successful for user:', user.email);
  
    return { accessToken, user: { email: user.email } };
  }

  async getUserProfile(userId: string): Promise<{ email: string; createdAt: Date }> {
    const user = await this.userModel.findById(userId).select('email createdAt');
    if (!user) throw new UnauthorizedException('User not found');
    return { email: user.email, createdAt: user.createdAt };
  }
}