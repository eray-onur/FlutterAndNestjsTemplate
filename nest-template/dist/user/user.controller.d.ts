import { CreateUserDto } from "./dtos/create-user.dto";
import { User } from "./user.schema";
import { UserService } from "./user.service";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getByUsername(username: string): Promise<User>;
    getAll(): Promise<Array<User>>;
    createUser(createUserDto: CreateUserDto): Promise<User>;
}
