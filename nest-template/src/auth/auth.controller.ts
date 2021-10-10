import { Body, Controller, Get, HttpException, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserService } from "src/user/user.service";
import { CreateUserDto } from "src/user/dtos/create-user.dto";
import { SigninUserDto } from "src/user/dtos/signin-user.dto";
import { RegisteredUserDto } from "src/user/dtos/registered-user.dto";
import { AuthorizedUserDto } from "src/user/dtos/authorized-user.dto";

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService, 
        private userService: UserService
    ) {}

    @Post('/login')
    async login(@Body() signinUserDto: SigninUserDto): Promise<AuthorizedUserDto> {
        return await this.authService.login(signinUserDto);
    }
    
    @Post('/register')
    async register(@Body() createUserDto: CreateUserDto) : Promise<RegisteredUserDto> {
        const registeredUser = await this.authService.register(createUserDto);
        console.log(registeredUser);
        if(registeredUser) {
            return Promise.resolve(registeredUser);
        }
        else throw new HttpException('Failed to register user.', HttpStatus.BAD_REQUEST);
    }


}