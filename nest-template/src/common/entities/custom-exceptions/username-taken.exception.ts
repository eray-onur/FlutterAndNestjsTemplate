import { HttpException } from "@nestjs/common";

export class UsernameTakenException extends HttpException {
    constructor() {
        super('A user with given username already exists.', 500);
    }
}