import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { User } from "./user.schema";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/getByUsername/:name')
    async getByUsername(@Param('username') username: string): Promise<User> {
        const user = await this.userService.findOneByUsername(username);
        if(user) {
            return Promise.resolve(user);
        } else {
            return Promise.reject('User not found.');
        }
    }

    @Get('/getAll')
    async getAll(): Promise<Array<User>> {
        const users = await this.userService.findAll();
        console.log(users);
        return Promise.resolve(users);
    }

    @Post('/createUser')
    async createUser(@Body() createUserDto: CreateUserDto) {
        return await this.userService.addUser(createUserDto);
    }
}