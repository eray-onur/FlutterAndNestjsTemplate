import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AuthRepository } from "src/auth/auth.repository";
import { AuthorizedUserDto } from "src/user/dtos/authorized-user.dto";
import { LoginCommand } from "../login.command";


@CommandHandler(LoginCommand)
export class LoginCommandHandler implements ICommandHandler<LoginCommand> {
    constructor(
        private readonly authRepository: AuthRepository
    ) { }

    async execute(command: LoginCommand): Promise<AuthorizedUserDto> {
        return await this.authRepository.login(command);
    }
}
