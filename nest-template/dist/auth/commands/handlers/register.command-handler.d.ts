import { ICommandHandler } from "@nestjs/cqrs";
import { AuthRepository } from "../../../auth/auth.repository";
import { RegisteredUserDto } from "../../../user/dtos/registered-user.dto";
import { RegisterCommand } from "../register.command";
export declare class RegisterCommandHandler implements ICommandHandler<RegisterCommand> {
    private readonly authRepository;
    constructor(authRepository: AuthRepository);
    execute(command: RegisterCommand): Promise<RegisteredUserDto>;
}
