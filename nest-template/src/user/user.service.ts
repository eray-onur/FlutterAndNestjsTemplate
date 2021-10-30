import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { AddUserCommand } from "./commands/add-user.command";
import { UpdateUserCommand } from "./commands/update-user.command";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { FindAllUsersQuery } from "./queries/find-all-users.query";
import { FindUserByEmailQuery } from "./queries/find-user-by-email.query";
import { FindUserByIdQuery } from "./queries/find-user-by-id.query";
import { FindUserByUsernameQuery } from "./queries/find-user-by-username.query";
import {User} from './user.schema';

@Injectable()
export class UserService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    async findOneById(id: string): Promise<User> {
        return await this.queryBus.execute(new FindUserByIdQuery(id));
    }

    async findOneByEmail(email: string): Promise<User> {
        return await this.queryBus.execute(new FindUserByEmailQuery(email));
    }

    async findOneByUsername(username: string): Promise<User> {
        return await this.queryBus.execute(new FindUserByUsernameQuery(username));
    }

    async findAll(): Promise<Array<User>> {
        return await this.queryBus.execute(new FindAllUsersQuery());
    }

    async addUser(createUserDto: CreateUserDto): Promise<User> {
        return await this.commandBus.execute(
            new AddUserCommand(
                createUserDto.email,
                createUserDto.username,
                createUserDto.password
            )
        );
    }

    async updateUser(updateUserDto: UpdateUserDto): Promise<User> {
        return await this.commandBus.execute(
            new UpdateUserCommand(
                updateUserDto.email,
                updateUserDto.username,
                updateUserDto.password
            )
        );
    }
}