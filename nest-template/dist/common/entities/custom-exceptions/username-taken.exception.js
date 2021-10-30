"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsernameTakenException = void 0;
const common_1 = require("@nestjs/common");
class UsernameTakenException extends common_1.HttpException {
    constructor() {
        super('A user with given username already exists.', 500);
    }
}
exports.UsernameTakenException = UsernameTakenException;
//# sourceMappingURL=username-taken.exception.js.map