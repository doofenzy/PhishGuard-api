import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { User } from '../schema/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dito';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async generateToken(userId) {
    const token = this.jwtService.sign({ userId });
    return { token };
  }

  async signup(signupDto: SignupDto) {
    const { email, username, password } = signupDto;
    Logger.log('Signup attempt:', { email, username, password });

    const existingUser = await this.userModel.findOne({
      $or: [{ email, username }],
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const soltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, soltRounds);

    const user = await this.userModel.create({
      email,
      username,
      password: hashedPassword,
    });

    return user;
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const user = await this.userModel.findOne({ username });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }

    const token = await this.generateToken(user._id);
    return token;
  }
}
