import { IQueryHandler } from "@nestjs/cqrs";
import { UserRepository } from "src/user/user.repository";
import { User } from "src/user/user.schema";
import { FindUserByUsernameQuery } from "../find-user-by-username.query";
export declare class FindUserByUsernameQueryHandler implements IQueryHandler<FindUserByUsernameQuery> {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(query: FindUserByUsernameQuery): Promise<User>;
}
