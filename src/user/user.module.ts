//import { Module } from '@nestjs/common';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { MailModule } from 'src/mail/mail.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule), 
    JwtModule.register({
      secret: 'shihab', 
      signOptions: { expiresIn: '1d' },
    }),MailModule,AuthModule
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
