import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterResponseDto } from './dto/register.response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Validate user credentials (email + password)
   */
  async validateUser(
    email: string,
    password: string,
  ): Promise<RegisterResponseDto> {
    const user = await this.usersService.findByEmail(email);
    const passwordMatches =
      user && (await bcrypt.compare(password, user.password));

    if (passwordMatches) {
      return user;
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  /**
   * Return JWT access token after successful login
   */
  login(user: RegisterResponseDto): { access_token: string } {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * Register a new user with hashed password
   */
  async register(
    email: string,
    password: string,
  ): Promise<RegisterResponseDto> {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersService.create({
      email,
      password: hashedPassword,
    });

    if (!user) {
      throw new InternalServerErrorException('User could not be created');
    }

    return user;
  }
}
