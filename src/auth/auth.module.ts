import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    PassportModule,
    ConfigModule,                      // make ConfigService available
    forwardRef(() => UserModule),

   JwtModule.registerAsync({
  useFactory: () => ({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '1d' },
  }),
})

  ],
  providers: [JwtStrategy],
  exports: [JwtModule],
})
export class AuthModule {}
