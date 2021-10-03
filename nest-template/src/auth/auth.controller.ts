import { Body, Controller, Get, HttpException, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserService } from "src/user/user.service";
import { CreateUserDto } from "src/user/dtos/create-user.dto";
import { SigninUserDto } from "src/user/dtos/signin-user.dto";
import { RegisteredUserDto } from "src/user/dtos/registered-user.dto";

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService, 
        private userService: UserService
    ) {}

    @Post('/login')
    async login(@Body() signinUserDto: SigninUserDto) {
        return await this.authService.login(signinUserDto);
    }
    
    @Post('/register')
    async register(@Body() createUserDto: CreateUserDto) : Promise<RegisteredUserDto> {
        const registeredUser = await this.authService.register(createUserDto);
        
        if(registeredUser) {
            const response: RegisteredUserDto = {username: registeredUser.username};
            return Promise.resolve(response);
        }
        else throw new HttpException('Failed to register user', HttpStatus.BAD_REQUEST);
    }


}