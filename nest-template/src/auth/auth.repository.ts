import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { SigninUserDto } from 'src/user/dtos/signin-user.dto';
import { User } from 'src/user/user.schema';
import { RegisteredUserDto } from 'src/user/dtos/registered-user.dto';
import { saltRounds } from 'src/common/constants';
import { AuthorizedUserDto } from 'src/user/dtos/authorized-user.dto';
import { UserRepository } from 'src/user/user.repository';
import { InvalidCredentialsException } from '../common/entities/custom-exceptions/invalid-credentials.exception';
import { NonexistentUserException } from '../common/entities/custom-exceptions/nonexistent-user.exception';
import { UsernameTakenException } from '../common/entities/custom-exceptions/username-taken.exception';
import { EmailTakenException } from '../common/entities/custom-exceptions/email-taken.exception';

@Injectable()
export class AuthRepository {
  constructor(private readonly userRepository: UserRepository, private jwtService: JwtService) {}

  async register(createUserDto: CreateUserDto): Promise<RegisteredUserDto> {
      // Check if this email already registered.
      let alreadyRegistered = await this.userRepository.findOneByEmail(createUserDto.email);
      if(alreadyRegistered)
        throw new EmailTakenException();

      // Check if a user with same username exists.
      let userWithSameUsername = await this.userRepository.findOneByUsername(createUserDto.username);
      if(userWithSameUsername)
        throw new UsernameTakenException();
      
      
      //
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

      const addedUser = await this.userRepository.addUser(newUser);
      const token = await this.jwtService.signAsync({
        sub: addedUser._id, 
        username: addedUser.username
      });
      const registeredUserDto : RegisteredUserDto = {
        username: addedUser.username,
        token: token
      };
      return registeredUserDto;
  }

  async login(signinUserDto: SigninUserDto): Promise<AuthorizedUserDto> {
    const foundUser = await this.userRepository.findOneByUsername(
      signinUserDto.username
    );
    if (foundUser) {
      const bcrypt = require('bcrypt');
      const hashedPassword = await bcrypt.hash(signinUserDto.password, foundUser.password_salt);
      console.log(`${hashedPassword} -- ${foundUser.password}`);

      if(hashedPassword !== foundUser.password) {
        throw new InvalidCredentialsException();
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
    else throw new NonexistentUserException();
  }

}