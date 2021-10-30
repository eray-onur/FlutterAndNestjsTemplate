import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { UserRepository } from "src/user/user.repository";
import { User } from "src/user/user.schema";
import { FindUserByUsernameQuery } from "../find-user-by-username.query";

@QueryHandler(FindUserByUsernameQuery)
export class FindUserByUsernameQueryHandler implements IQueryHandler<FindUserByUsernameQuery> {
    constructor(
        private readonly userRepository: UserRepository
    ) {}

    async execute(query: FindUserByUsernameQuery): Promise<User> {
        return await this.userRepository.findOneByEmail(query.username);
    }
}