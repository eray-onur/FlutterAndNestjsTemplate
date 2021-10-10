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
import { AuthorizedUserDto } from 'src/user/dtos/authorized-user.dto';

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
      const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

      const newUser: User = {
        email: createUserDto.email,
        username: createUserDto.username,
        password: hashedPassword,
        password_salt: salt,
        created_at: new Date()
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

  async login(signinUserDto: SigninUserDto): Promise<AuthorizedUserDto> {
    try {
      const foundUser = await this.userService.findOneByUsername(
        signinUserDto.username
      );
      if (foundUser) {
        const bcrypt = require('bcrypt');
        const hashedPassword = await bcrypt.hash(signinUserDto.password, foundUser.password_salt);
        console.log(`${hashedPassword} -- ${foundUser.password}`);

        if(foundUser.password !== hashedPassword) {
          throw new Error(`Invalid password.`);
        }

        const token = await this.jwtService.signAsync({
          sub: foundUser._id, 
          username: foundUser.username
        });
        
        const authorizedUser: AuthorizedUserDto = {
          username: foundUser.username,
          token: token
        };

        return authorizedUser;

      }
      throw new Error(`Login failed for user ${signinUserDto.username}.`);
    } catch (ex) {
      console.error(ex);
    }
  }

  async provideApiKey(): Promise<string> {
    return await Promise.resolve(apiKey);
  }
}