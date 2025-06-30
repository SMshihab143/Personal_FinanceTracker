import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Patch,
  Body,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from '../auth/jwt-authguard';
import { GetUser } from '../auth/userinfo.decorator';
import { User } from './entity/user.entity';
import { extname } from 'path';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/userupdate.dto';
import { UserSignupDto } from './dto/user-signup.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /* ---------- Profile image ---------- */

  @UseGuards(JwtAuthGuard)
  @Post('upload-profile')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/profile',
        filename: (_, file, cb) => {
          const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          cb(null, `${unique}${extname(file.originalname)}`);
        },
      }),
      limits: { fileSize: 2 * 1024 * 1024 },
      fileFilter: (_, file, cb) => {
        cb(
          file.mimetype.match(/^image\/(jpeg|png|jpg)$/)
            ? null
            : new Error('Only image files are allowed!'),
          true,
        );
      },
    }),
  )
  uploadProfileImage(
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: User,
  ) {
    return this.userService.updateProfileImage(user.id, file.filename);
  }

  @UseGuards(JwtAuthGuard)
  @Post('remove-profile')
  removeProfile(@GetUser() user: User) {
    return this.userService.removeProfileImage(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('edit')
  editProfile(@GetUser() user: User, @Body() dto: UpdateUserDto) {
    return this.userService.editProfile(user.id, dto);
  }

  

  @Post('signup')
  signup(@Body() dto: UserSignupDto) {
    return this.userService.signup(dto);
  }

@Post('login')
async login(@Body() dto: UserLoginDto, @Res() res: Response) {
  const { token } = await this.userService.login(dto);
  res
    .cookie('jwt', token, {
      httpOnly: true,
      sameSite: 'lax',   // or 'strict' in prod
      maxAge: 24 * 60 * 60 * 1000,
    })
    .json({ msg: 'logged in' });
}



  @UseGuards(JwtAuthGuard)
@Post('logout')
logout(@Res({ passthrough: true }) res: Response) {
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/', // must match cookie set during login
  });
  return { message: 'Logged out' };
}




  @Post('forgot-password')
  forgotPassword(@Body('email') email: string) {
    return this.userService.forgotPassword(email);
  }

  @Post('reset-password')
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.userService.resetPassword(dto.token, dto.newPassword);
  }

  
}
