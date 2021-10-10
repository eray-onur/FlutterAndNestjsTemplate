import { AuthService } from "./auth.service";
import { UserService } from "src/user/user.service";
import { CreateUserDto } from "src/user/dtos/create-user.dto";
import { SigninUserDto } from "src/user/dtos/signin-user.dto";
import { RegisteredUserDto } from "src/user/dtos/registered-user.dto";
import { AuthorizedUserDto } from "src/user/dtos/authorized-user.dto";
export declare class AuthController {
    private authService;
    private userService;
    constructor(authService: AuthService, userService: UserService);
    login(signinUserDto: SigninUserDto): Promise<AuthorizedUserDto>;
    register(createUserDto: CreateUserDto): Promise<RegisteredUserDto>;
}
