import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { SigninUserDto } from 'src/user/dtos/signin-user.dto';
import { RegisteredUserDto } from 'src/user/dtos/registered-user.dto';
import { AuthorizedUserDto } from 'src/user/dtos/authorized-user.dto';
import { UserRepository } from 'src/user/user.repository';
export declare class AuthRepository {
    private readonly userRepository;
    private jwtService;
    constructor(userRepository: UserRepository, jwtService: JwtService);
    register(createUserDto: CreateUserDto): Promise<RegisteredUserDto>;
    login(signinUserDto: SigninUserDto): Promise<AuthorizedUserDto>;
}
