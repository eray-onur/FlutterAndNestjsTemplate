"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindUserByIdQueryHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const user_repository_1 = require("../../user.repository");
const user_schema_1 = require("../../user.schema");
const find_user_by_id_query_1 = require("../find-user-by-id.query");
let FindUserByIdQueryHandler = class FindUserByIdQueryHandler {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(query) {
        return await this.userRepository.findOneByEmail(query.id);
    }
};
FindUserByIdQueryHandler = __decorate([
    (0, cqrs_1.QueryHandler)(find_user_by_id_query_1.FindUserByIdQuery),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], FindUserByIdQueryHandler);
exports.FindUserByIdQueryHandler = FindUserByIdQueryHandler;
//# sourceMappingURL=find-user-by-id.query-handler.js.map