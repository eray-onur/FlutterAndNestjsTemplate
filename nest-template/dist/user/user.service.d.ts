import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { UserRepository } from "./user.repository";
import { User } from './user.schema';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    findOneById(id: string): Promise<User>;
    findOneByEmail(email: string): Promise<User>;
    findOneByUsername(username: string): Promise<User>;
    findAll(): Promise<Array<User>>;
    addUser(createUserDto: CreateUserDto): Promise<User>;
    updateUser(updateUserDto: UpdateUserDto): Promise<User>;
}
