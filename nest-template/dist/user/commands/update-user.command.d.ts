import { ICommand } from "@nestjs/cqrs";
export declare class UpdateUserCommand implements ICommand {
    readonly email: string;
    readonly username: string;
    readonly password: string;
    constructor(email: string, username: string, password: string);
}
