// import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { MongooseModule } from '@nestjs/mongoose';
// import { UserModule } from './user/user.module';

// @Module({
//   imports: [
//     ConfigModule.forRoot({ isGlobal: true }), // Đọc biến môi trường từ .env
//     MongooseModule.forRootAsync({
//       imports: [ConfigModule],
//       useFactory: (configService: ConfigService) => ({
//         uri: configService.get<string>('DATABASE_URI'),
//       }),
//       inject: [ConfigService],
//     }),
//     UserModule,
//   ],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Để sử dụng các biến môi trường từ .env
    MongooseModule.forRoot(process.env.DATABASE_URL), // Kết nối với MongoDB
    UserModule,
  ],
})
export class AppModule {}
