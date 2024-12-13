import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.services';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: any) {
    // Ensure we have the correct user data
    const dbUser = await this.usersService.findByEmail(user.email);
    
    const payload = {
      email: dbUser.email,
      sub: dbUser._id.toString(), // Convert ObjectId to string
      role: dbUser.role
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        email: dbUser.email,
        role: dbUser.role,
        id: dbUser._id
      }
    };
  }
}