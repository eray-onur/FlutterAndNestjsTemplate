import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, Req, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { SigninUserDto } from 'src/user/dtos/signin-user.dto';
import { User } from 'src/user/user.schema';
import { UserService } from '../user/user.service';
import { RegisteredUserDto } from 'src/user/dtos/registered-user.dto';
import { saltRounds } from 'src/common/constants';
import { AuthorizedUserDto } from 'src/user/dtos/authorized-user.dto';
import { UserRepository } from 'src/user/user.repository';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository, private jwtService: JwtService) {}

  async register(createUserDto: CreateUserDto): Promise<RegisteredUserDto> {
      // Check if this email already registered.
      
      return await this.authRepository.register(createUserDto);
  }

  async login(signinUserDto: SigninUserDto): Promise<AuthorizedUserDto> {
    return await this.authRepository.login(signinUserDto);
  }

}