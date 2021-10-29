import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { SigninUserDto } from 'src/user/dtos/signin-user.dto';
import { RegisteredUserDto } from 'src/user/dtos/registered-user.dto';
import { AuthorizedUserDto } from 'src/user/dtos/authorized-user.dto';
import { AuthRepository } from './auth.repository';
export declare class AuthService {
    private readonly authRepository;
    private jwtService;
    constructor(authRepository: AuthRepository, jwtService: JwtService);
    register(createUserDto: CreateUserDto): Promise<RegisteredUserDto>;
    login(signinUserDto: SigninUserDto): Promise<AuthorizedUserDto>;
}
