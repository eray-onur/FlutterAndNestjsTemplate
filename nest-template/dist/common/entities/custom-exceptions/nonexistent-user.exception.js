"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NonexistentUserException = void 0;
const common_1 = require("@nestjs/common");
class NonexistentUserException extends common_1.HttpException {
    constructor() {
        super('Requested user does not exist.', 404);
    }
}
exports.NonexistentUserException = NonexistentUserException;
//# sourceMappingURL=nonexistent-user.exception.js.map