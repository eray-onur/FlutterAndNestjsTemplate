import { Model } from "mongoose";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { User, UserDocument } from "./user.schema";
export declare class UserRepository {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    findOneById(id: string): Promise<User>;
    findOneByEmail(email: string): Promise<User>;
    findOneByUsername(username: string): Promise<User>;
    findAll(): Promise<Array<User>>;
    addUser(createUserDto: CreateUserDto): Promise<User>;
    updateUser(updateUserDto: UpdateUserDto): Promise<User>;
}
