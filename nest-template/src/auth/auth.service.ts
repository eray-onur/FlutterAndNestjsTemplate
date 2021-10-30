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
import { CommandBus } from '@nestjs/cqrs';
import { RegisterCommand } from './commands/register.command';
import { LoginCommand } from './commands/login.command';

@Injectable()
export class AuthService {
  constructor(private readonly commandBus: CommandBus) {}

  async register(createUserDto: CreateUserDto): Promise<RegisteredUserDto> {
    const commandResult = await this.commandBus.execute(new RegisterCommand(createUserDto.email, createUserDto.username, createUserDto.password));
    
    return commandResult;
  }

  async login(signinUserDto: SigninUserDto): Promise<AuthorizedUserDto> {
    const commandResult = await this.commandBus.execute(new LoginCommand(signinUserDto.username, signinUserDto.password));

    return commandResult;
  }

}