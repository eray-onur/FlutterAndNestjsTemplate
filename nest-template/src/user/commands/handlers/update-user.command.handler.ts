import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UserRepository } from "src/user/user.repository";
import { User } from "src/user/user.schema";
import { UpdateUserCommand } from "../update-user.command";

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler implements ICommandHandler<UpdateUserCommand> {
    constructor(
        private readonly userRepository: UserRepository
    ) {}

    async execute(command: UpdateUserCommand): Promise<User> {
        return await this.userRepository.updateUser(command);
    }
}