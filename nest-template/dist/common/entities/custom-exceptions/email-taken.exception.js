"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailTakenException = void 0;
const common_1 = require("@nestjs/common");
class EmailTakenException extends common_1.HttpException {
    constructor() {
        super('A user with given email already exists.', 500);
    }
}
exports.EmailTakenException = EmailTakenException;
//# sourceMappingURL=email-taken.exception.js.map