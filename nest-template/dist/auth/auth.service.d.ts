import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { SigninUserDto } from 'src/user/dtos/signin-user.dto';
import { User } from 'src/user/user.schema';
import { UserService } from '../user/user.service';
import { JwtPayloadDto } from './dtos/jwt-payload.dto';
export declare class AuthService {
    private readonly userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(payload: JwtPayloadDto): Promise<any>;
    register(createUserDto: CreateUserDto): Promise<User>;
    login(signinUserDto: SigninUserDto): Promise<{
        access_token: string;
        message?: undefined;
    } | {
        message: any;
        access_token?: undefined;
    }>;
}
