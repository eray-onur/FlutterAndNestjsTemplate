import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AuthRepository } from "../../../auth/auth.repository";
import { RegisteredUserDto } from "../../../user/dtos/registered-user.dto";
import { RegisterCommand } from "../register.command";


@CommandHandler(RegisterCommand)
export class RegisterCommandHandler implements ICommandHandler<RegisterCommand> {
    constructor(
        private readonly authRepository: AuthRepository
    ) { }

    async execute(command: RegisterCommand): Promise<RegisteredUserDto> {
        return await this.authRepository.register(command);
    }
}
