import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import {User, UserDocument} from './user.schema';
@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<UserDocument>
    ) {}

    async findOneById(id: string): Promise<User> {
        return await this.userModel.findById(id);
    }

    async findOneByUsername(username: string): Promise<User> {
        return await this.userModel.findOne({username: username});
    }

    async findAll(): Promise<Array<User>> {
        return await this.userModel.find().exec();
    }

    async addUser(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = {...createUserDto, created_at: new Date()};
        const result = new this.userModel(createdUser);
        return await result.save();
    }

    async updateUser(updateUserDto: UpdateUserDto): Promise<User> {
        const updatedUser = {...updateUserDto, modified_at: new Date()};
        const result = new this.userModel(updatedUser);
        return await result.save();
    }
}