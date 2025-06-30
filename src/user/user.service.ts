import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { UserSignupDto } from './dto/user-signup.dto';
import { UserLoginDto } from './dto/user-login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { randomBytes } from 'crypto';
import { UpdateUserDto } from './dto/userupdate.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  

async signup(dto: UserSignupDto): Promise<string> {
  const { name, address, phone, email, gender, nid, password } = dto;

  if (await this.userRepository.findOne({ where: [{ email }, { nid }] })) {
    throw new BadRequestException('Email or NID already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const uniqueCode = Math.floor(100_000 + Math.random() * 900_000).toString();

  const user = this.userRepository.create({
    name,
    address,
    phone,
    email,
    gender,
    nid,
    password: hashedPassword,
    uniqueCode,
    requireUniqueCode: true,        
  });

  await this.userRepository.save(user);
  await this.mailService.sendWelcomeEmail(email, name, uniqueCode);

  return 'Signup successful! Please log in with your email, password, and unique code.';
}


  
async login(dto: UserLoginDto): Promise<{ token: string }> {
  const { email, password, uniqueCode } = dto;

  const user = await this.userRepository.findOne({ where: { email } });
  if (!user) throw new BadRequestException('Invalid email');

  
  const passOK = await bcrypt.compare(password, user.password);
  if (!passOK) throw new BadRequestException('Invalid password');

  
  if (user.requireUniqueCode) {
    if (!uniqueCode) {
      throw new BadRequestException('Unique code required');    
    }
    if (uniqueCode !== user.uniqueCode) {
      throw new BadRequestException('Invalid unique code');
    }

    
    user.requireUniqueCode = false;
    await this.userRepository.save(user);
  }

  
  const payload = { sub: user.id, email: user.email };
  const token = this.jwtService.sign(payload);
  return { token };
  
}


  

  async updateProfileImage(userId: number, filename: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');
    user.profileImage = filename;
    await this.userRepository.save(user);
    return { message: 'Profile image uploaded successfully', filename };
  }

  async removeProfileImage(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');
    user.profileImage = null;
    await this.userRepository.save(user);
    return { message: 'Profile picture removed' };
  }

  

  async forgotPassword(email: string): Promise<string> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new BadRequestException('No user found with this email.');

    const token = randomBytes(32).toString('hex');
    user.resetToken = token;
    user.resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 30); // 30 min
    await this.userRepository.save(user);

    const link = `http://localhost:3001/reset-password?token=${token}`;
    await this.mailService.sendPasswordResetEmail(user.email, link);

    return 'Password reset link sent to your email.';
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
  const user = await this.userRepository.findOne({ where: { resetToken: token } });
  if (!user || !user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
    throw new BadRequestException('Invalid or expired reset token');
  }

  
  user.password = await bcrypt.hash(newPassword, 10);

  
  user.resetToken = null;
  user.resetTokenExpiry = null;

  if (!user.uniqueCode) {
    user.uniqueCode = Math.floor(100_000 + Math.random() * 900_000).toString();
  }

  user.requireUniqueCode = true;

  
  await this.userRepository.save(user);

  
  await this.mailService.sendLoginInfoEmail(user.email, user.uniqueCode); 
}


  

  async getProfile(id: number): Promise<Partial<User>> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new Error('User not found');
    const { password, resetToken, resetTokenExpiry, uniqueCode, ...safe } = user;
    return safe;
  }

  async editProfile(id: number, dto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new Error('User not found');
    Object.assign(user, dto);
    await this.userRepository.save(user);
    return { message: 'Profile updated successfully' };
  }

  
}
