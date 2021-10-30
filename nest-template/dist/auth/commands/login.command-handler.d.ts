import { ICommandHandler } from "@nestjs/cqrs";
import { AuthorizedUserDto } from "src/user/dtos/authorized-user.dto";
import { AuthRepository } from '../auth.repository';
import { LoginCommand } from "./login.command";
export declare class LoginCommandHandler implements ICommandHandler<LoginCommand> {
    private readonly authRepository;
    constructor(authRepository: AuthRepository);
    execute(command: LoginCommand): Promise<AuthorizedUserDto>;
}
