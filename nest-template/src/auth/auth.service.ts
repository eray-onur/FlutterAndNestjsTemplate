import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { SigninUserDto } from 'src/user/dtos/signin-user.dto';
import { User } from 'src/user/user.schema';
import { UserService } from '../user/user.service';
import { apiKey, secret } from './auth.constants';
import { JwtPayloadDto } from './dtos/jwt-payload.dto';
import { RegisteredUserDto } from 'src/user/dtos/registered-user.dto';
import { saltRounds } from 'src/common/constants';

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
        const bcrypt = require('bcrypt');
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(createUserDto.password, salt);
        const newUser = {
          email: createUserDto.email,
          username: createUserDto.username,
          password: hash
        };
        const addedUser = await this.userService.addUser(newUser);
        const token = await this.jwtService.signAsync({
          sub: addedUser._id, 
          username: addedUser.username
        });
        const registeredUserDto : RegisteredUserDto = {
          username: addedUser.username,
          token: token
        };

        return registeredUserDto;
    } catch(err) {
      console.error(err);
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
        
        return await this.jwtService.signAsync({
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