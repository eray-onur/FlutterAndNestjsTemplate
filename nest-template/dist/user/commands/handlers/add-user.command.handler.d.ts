import { ICommandHandler } from "@nestjs/cqrs";
import { UserRepository } from "src/user/user.repository";
import { User } from "src/user/user.schema";
import { AddUserCommand } from "../add-user.command";
export declare class AddUserCommandHandler implements ICommandHandler<AddUserCommand> {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(command: AddUserCommand): Promise<User>;
}
