import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UserRepository } from "src/user/user.repository";
import { User } from "src/user/user.schema";
import { AddUserCommand } from "../add-user.command";

@CommandHandler(AddUserCommand)
export class AddUserCommandHandler implements ICommandHandler<AddUserCommand> {
    constructor(
        private readonly userRepository: UserRepository
    ) {}

    async execute(command: AddUserCommand): Promise<User> {
        return await this.userRepository.addUser(command);
    }
}