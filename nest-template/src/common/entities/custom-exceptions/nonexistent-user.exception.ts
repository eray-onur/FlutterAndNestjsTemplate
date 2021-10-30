import { HttpException } from "@nestjs/common";

export class NonexistentUserException extends HttpException {
    constructor() {
        super('Requested user does not exist.', 404);
    }
}