import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { UserRepository } from "src/user/user.repository";
import { User } from "src/user/user.schema";
import { FindUserByEmailQuery } from "../find-user-by-email.query";

@QueryHandler(FindUserByEmailQuery)
export class FindUserByEmailQueryHandler implements IQueryHandler<FindUserByEmailQuery> {
    constructor(
        private readonly userRepository: UserRepository
    ) {}

    async execute(query: FindUserByEmailQuery): Promise<User> {
        return await this.userRepository.findOneByEmail(query.email);
    }
}