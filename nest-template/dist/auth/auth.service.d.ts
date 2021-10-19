import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { SigninUserDto } from 'src/user/dtos/signin-user.dto';
import { UserService } from '../user/user.service';
import { RegisteredUserDto } from 'src/user/dtos/registered-user.dto';
import { AuthorizedUserDto } from 'src/user/dtos/authorized-user.dto';
export declare class AuthService {
    private readonly userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    register(createUserDto: CreateUserDto): Promise<RegisteredUserDto>;
    login(signinUserDto: SigninUserDto): Promise<AuthorizedUserDto>;
}
