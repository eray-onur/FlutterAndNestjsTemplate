import { Body, Controller, Get, HttpException, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CreateUserDto } from "src/user/dtos/create-user.dto";

@Controller('dummy')
export class DummyController {
    constructor(
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get('/dummyGet')
    dummyGet(@Request() req) {
        return 'DUMMY GET RESULT';
    }
    
    @Post('/dummyPost')
    async register(@Body() createUserDto) {
        
    }


}