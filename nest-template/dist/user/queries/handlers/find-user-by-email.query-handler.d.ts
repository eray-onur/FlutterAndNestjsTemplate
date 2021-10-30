import { IQueryHandler } from "@nestjs/cqrs";
import { UserRepository } from "src/user/user.repository";
import { User } from "src/user/user.schema";
import { FindUserByEmailQuery } from "../find-user-by-email.query";
export declare class FindUserByEmailQueryHandler implements IQueryHandler<FindUserByEmailQuery> {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(query: FindUserByEmailQuery): Promise<User>;
}
