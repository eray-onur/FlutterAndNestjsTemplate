import { IQueryHandler } from "@nestjs/cqrs";
import { UserRepository } from "src/user/user.repository";
import { User } from "src/user/user.schema";
import { FindAllUsersQuery } from "../find-all-users.query";
export declare class FindAllUsersQueryHandler implements IQueryHandler<FindAllUsersQuery> {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(query: FindAllUsersQuery): Promise<Array<User>>;
}
