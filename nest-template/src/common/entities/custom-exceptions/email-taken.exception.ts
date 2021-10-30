import { HttpException } from "@nestjs/common";

export class EmailTakenException extends HttpException {
    constructor() {
        super('A user with given email already exists.', 500);
    }
}