import { ICommand } from "@nestjs/cqrs";
export declare class LoginCommand implements ICommand {
    readonly username: string;
    readonly password: string;
    constructor(username: string, password: string);
}
