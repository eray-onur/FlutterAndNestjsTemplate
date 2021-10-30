import { ICommandHandler } from "@nestjs/cqrs";
import { RegisteredUserDto } from "src/user/dtos/registered-user.dto";
import { AuthRepository } from "../auth.repository";
import { RegisterCommand } from "./register.command";
export default class RegisterCommandHandler implements ICommandHandler<RegisterCommand> {
    private readonly authRepository;
    constructor(authRepository: AuthRepository);
    execute(command: RegisterCommand): Promise<RegisteredUserDto>;
}
