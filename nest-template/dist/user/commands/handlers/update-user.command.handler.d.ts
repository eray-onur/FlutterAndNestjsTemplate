import { ICommandHandler } from "@nestjs/cqrs";
import { UserRepository } from "src/user/user.repository";
import { User } from "src/user/user.schema";
import { UpdateUserCommand } from "../update-user.command";
export declare class UpdateUserCommandHandler implements ICommandHandler<UpdateUserCommand> {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(command: UpdateUserCommand): Promise<User>;
}
