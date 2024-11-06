// // src/user/user.service.ts
// import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import * as bcrypt from 'bcryptjs';
// import { JwtService } from '@nestjs/jwt';
// import { User } from './schemas/user.schema';
// import { RegisterDto } from './dto/register.dto';
// import { LoginDto } from './dto/login.dto';

// @Injectable()
// export class UserService {
//   constructor(
//     @InjectModel(User.name) private userModel: Model<User>,
//     private jwtService: JwtService,
//   ) {}

//   async register(registerDto: RegisterDto): Promise<string> {
//     const { email, password } = registerDto;

//     const existingUser = await this.userModel.findOne({ email });
//     if (existingUser) throw new ConflictException('Email already exists');

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new this.userModel({ email, password: hashedPassword });

//     try {
//       await newUser.save();
//       return 'User registered successfully';
//     } catch (error) {
//       throw new InternalServerErrorException('Error creating user');
//     }
//   }

//   async login(loginDto: LoginDto): Promise<{ accessToken: string; user: { email: string } }> {
//     const { email, password } = loginDto;
    
//     const normalizedEmail = email.trim().toLowerCase();
//     const user = await this.userModel.findOne({ email: normalizedEmail });

//     if (!user) {
//       throw new UnauthorizedException('Invalid email or password');
//     }
  
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       throw new UnauthorizedException('Invalid email or password');
//     }
  
//     const payload = { userId: user._id, email: user.email };
//     const accessToken = this.jwtService.sign(payload);
  
//     return { accessToken, user: { email: user.email } };
//   }

//   async getUserProfile(userId: string): Promise<{ email: string; createdAt: Date }> {
//     const user = await this.userModel.findById(userId).select('email createdAt');
//     if (!user) throw new UnauthorizedException('User not found');
//     return { email: user.email, createdAt: user.createdAt };
//   }
// }

import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User } from './schemas/user.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private configService: ConfigService,
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
    
    const normalizedEmail = email.trim().toLowerCase();
    const user = await this.userModel.findOne({ email: normalizedEmail });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }
  
    const payload = { userId: user._id, email: user.email };
    // const secret = this.configService.get<string>('JWT_SECRET');
    const secret = 'nAgaT0biM4ru@01082003';
    const accessToken = jwt.sign(payload, secret, { expiresIn: '1h' });
  
    return { accessToken, user: { email: user.email } };
  }

  async getUserProfile(userId: string): Promise<{ email: string; createdAt: Date }> {
    const user = await this.userModel.findById(userId).select('email createdAt');
    if (!user) throw new UnauthorizedException('User not found');
    return { email: user.email, createdAt: user.createdAt };
  }
}