import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { UserRepository } from "./user.repository";
import {User, UserDocument} from './user.schema';
@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository
    ) {}

    async findOneById(id: string): Promise<User> {
        return await this.userRepository.findOneById(id);
    }

    async findOneByEmail(email: string): Promise<User> {
        return await this.userRepository.findOneByEmail(email);
    }

    async findOneByUsername(username: string): Promise<User> {
        return await this.userRepository.findOneByUsername(username);
    }

    async findAll(): Promise<Array<User>> {
        return await this.userRepository.findAll();
    }

    async addUser(createUserDto: CreateUserDto): Promise<User> {
        return await this.userRepository.addUser(createUserDto);
    }

    async updateUser(updateUserDto: UpdateUserDto): Promise<User> {
        return await this.userRepository.updateUser(updateUserDto);
    }
}