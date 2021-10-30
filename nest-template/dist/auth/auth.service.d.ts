import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { SigninUserDto } from 'src/user/dtos/signin-user.dto';
import { RegisteredUserDto } from 'src/user/dtos/registered-user.dto';
import { AuthorizedUserDto } from 'src/user/dtos/authorized-user.dto';
import { CommandBus } from '@nestjs/cqrs';
export declare class AuthService {
    private readonly commandBus;
    constructor(commandBus: CommandBus);
    register(createUserDto: CreateUserDto): Promise<RegisteredUserDto>;
    login(signinUserDto: SigninUserDto): Promise<AuthorizedUserDto>;
}
