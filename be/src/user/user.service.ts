// import { Injectable, ConflictException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import * as bcrypt from 'bcryptjs';
// import { User } from './user.schema';
// import { CreateUserDto } from './user.dto';

// @Injectable()
// export class UserService {
//   constructor(@InjectModel(User.name) private userModel: Model<User>) {}

//   async register(createUserDto: CreateUserDto): Promise<any> {
//     const { email, password } = createUserDto;

//     // Kiểm tra xem email đã tồn tại chưa
//     const existingUser = await this.userModel.findOne({ email });
//     if (existingUser) {
//       throw new ConflictException('Email already exists');
//     }

//     // Mã hóa mật khẩu
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new this.userModel({ email, password: hashedPassword });

//     await newUser.save();
//     return { message: 'User registered successfully' };
//   }
// }
// src/user/user.service.ts
import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from './schemas/user.schema';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async register(registerDto: RegisterDto): Promise<string> {
    const { email, password } = registerDto;

    // Kiểm tra xem email đã tồn tại chưa
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) throw new ConflictException('Email already exists');

    // Mã hóa mật khẩu và tạo người dùng
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({ email, password: hashedPassword });

    try {
      await newUser.save();
      return 'User registered successfully';
    } catch (error) {
      throw new InternalServerErrorException('Error creating user');
    }
  }
}
