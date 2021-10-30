import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { UserRepository } from "src/user/user.repository";
import { User } from "src/user/user.schema";
import { FindAllUsersQuery } from "../find-all-users.query";

@QueryHandler(FindAllUsersQuery)
export class FindAllUsersQueryHandler implements IQueryHandler<FindAllUsersQuery> {
    constructor(
        private readonly userRepository: UserRepository
    ) {}

    async execute(query: FindAllUsersQuery): Promise<Array<User>> {
        return await this.userRepository.findAll();
    }
}