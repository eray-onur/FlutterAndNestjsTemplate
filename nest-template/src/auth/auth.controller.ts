import { Body, Controller, Get, HttpException, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { LoginDto } from "src/common/entities/dtos/login.dto";
import { RegisterDto } from "src/common/entities/dtos/register.dto";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { UserService } from "src/user/user.service";
import { CreateUserDto } from "src/user/dtos/create-user.dto";
import { SigninUserDto } from "src/user/dtos/signin-user.dto";
import { RegisteredUserDto } from "src/user/dtos/registered-user.dto";
import { randomUUID } from "crypto";

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
            const response: RegisteredUserDto = {username: registeredUser.username, appId: randomUUID(), secretKey: 'anan'};
            return Promise.resolve(response);
        }
        else throw new HttpException('Failed to register user', HttpStatus.BAD_REQUEST);
    }

}