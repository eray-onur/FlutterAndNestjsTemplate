import { Body, Controller, HttpCode, HttpException, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/user/dtos/create-user.dto";
import { SigninUserDto } from "src/user/dtos/signin-user.dto";
import { RegisteredUserDto } from "src/user/dtos/registered-user.dto";
import { AuthorizedUserDto } from "src/user/dtos/authorized-user.dto";

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService, 
    ) {}


    @Post('/login')
    async login(@Body() signinUserDto: SigninUserDto): Promise<AuthorizedUserDto> {
        try {
        return await this.authService.login(signinUserDto);
        } catch(ex) {
            console.log(ex);
            throw new HttpException(ex.message, ex.status);
        }
    }

    @HttpCode(201)
    @Post('/register')
    async register(@Body() createUserDto: CreateUserDto) : Promise<RegisteredUserDto> {
        try {
            const registeredUser = await this.authService.register(createUserDto);
            if(registeredUser) {
                return Promise.resolve(registeredUser);
            }

        } catch(ex) {
            console.log(ex);
            throw new HttpException(ex.message, ex.status);
        }
        
    }


}