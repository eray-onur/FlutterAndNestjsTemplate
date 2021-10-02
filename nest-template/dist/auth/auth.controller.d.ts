import { AuthService } from "./auth.service";
import { UserService } from "src/user/user.service";
import { CreateUserDto } from "src/user/dtos/create-user.dto";
import { SigninUserDto } from "src/user/dtos/signin-user.dto";
import { RegisteredUserDto } from "src/user/dtos/registered-user.dto";
export declare class AuthController {
    private authService;
    private userService;
    constructor(authService: AuthService, userService: UserService);
    login(signinUserDto: SigninUserDto): Promise<{
        access_token: string;
        message?: undefined;
    } | {
        message: any;
        access_token?: undefined;
    }>;
    register(createUserDto: CreateUserDto): Promise<RegisteredUserDto>;
}
