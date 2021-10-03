import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { SigninUserDto } from 'src/user/dtos/signin-user.dto';
import { User } from 'src/user/user.schema';
import { UserService } from '../user/user.service';
import { apiKey, secret } from './auth.constants';
import { JwtPayloadDto } from './dtos/jwt-payload.dto';
import crypto, { createSecretKey } from 'crypto';
import { RegisteredUserDto } from 'src/user/dtos/registered-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService) {}

  async validateUser(payload: JwtPayloadDto): Promise<User> {
    const user = await this.userService.findOneByUsername(payload.username);
    if (user) {
      return Promise.resolve(user);
    }
    return Promise.reject('No such user was found.');
  }

  async register(createUserDto: CreateUserDto): Promise<RegisteredUserDto> {
    try {
      const registeredUser = await this.userService.addUser(createUserDto);
      return Promise.resolve(registeredUser);
    } catch(err) {
      return Promise.reject(`Failed to create user. Reason: ${err}`);
    }
  }

  async login(signinUserDto: SigninUserDto) {
    try {
      const foundUser = await this.userService.findOneByUsername(
        signinUserDto.username
      );
      if (foundUser) {
        if(foundUser.password !== signinUserDto.password) {
          throw new Error(`Invalid password.`);
        }
        
        return this.jwtService.sign({
          sub: foundUser._id, 
          username: foundUser.username
        });
      }
      throw new Error(`Login failed for user ${signinUserDto.username}.`);
    } catch (ex) {
      console.log(ex.statusCode);
      return {
        message: ex.message
      };
    }
  }

  async provideApiKey(): Promise<string> {
    return await Promise.resolve(apiKey);
  }
}