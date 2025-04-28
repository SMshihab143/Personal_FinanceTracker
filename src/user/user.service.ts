import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { UserSignupDto } from './dto/user-signup.dto';
import { UserLoginDto } from './dto/user-login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signup(userSignupDto: UserSignupDto): Promise<string> {
    const { name, address, phone, email, gender, nid, password } = userSignupDto;

    const existingUser = await this.userRepository.findOne({ where: [{ email }, { nid }] });
    if (existingUser) {
      throw new BadRequestException('Email or NID already exists');
    }

    //const hashedPassword = await bcrypt.hash(password, 10);
    const uniqueCode = Math.random().toString(36).substring(2, 8);

    const user = this.userRepository.create({
      name,
      address,
      phone,
      email,
      gender,
      nid,
      password,// hashedPassword,
      uniqueCode,
    });

    await this.userRepository.save(user);

    return 'Signup successful! Please login using your email, password, and unique code.';
  }

  async login(userLoginDto: UserLoginDto): Promise<{ message: string; accessToken: string }> {
    const { email, password, uniqueCode } = userLoginDto;

    const user = await this.userRepository.findOne({ where: { email, uniqueCode } });
    if (!user) {
      throw new BadRequestException('Invalid credentials or unique code');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload = { id: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return {
      message: 'Login successful!',
      accessToken,
    };
  }
}
