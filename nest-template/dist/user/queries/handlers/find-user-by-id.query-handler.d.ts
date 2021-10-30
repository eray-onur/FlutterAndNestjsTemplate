import { IQueryHandler } from "@nestjs/cqrs";
import { UserRepository } from "src/user/user.repository";
import { User } from "src/user/user.schema";
import { FindUserByIdQuery } from "../find-user-by-id.query";
export declare class FindUserByIdQueryHandler implements IQueryHandler<FindUserByIdQuery> {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(query: FindUserByIdQuery): Promise<User>;
}
