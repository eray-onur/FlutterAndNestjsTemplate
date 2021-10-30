import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { UserRepository } from "src/user/user.repository";
import { User } from "src/user/user.schema";
import { FindUserByIdQuery } from "../find-user-by-id.query";

@QueryHandler(FindUserByIdQuery)
export class FindUserByIdQueryHandler implements IQueryHandler<FindUserByIdQuery> {
    constructor(
        private readonly userRepository: UserRepository
    ) {}

    async execute(query: FindUserByIdQuery): Promise<User> {
        return await this.userRepository.findOneByEmail(query.id);
    }
}