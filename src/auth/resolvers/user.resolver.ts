import { Resolver, Query, Args } from "@nestjs/graphql";
import { User } from "src/auth/user.entity";
import { AuthService } from "../auth.service";

@Resolver('User')
export class UserResolver {
    constructor(private authService:AuthService){

    }

    @Query(() => String)
    async hello() {
        return 'hello'
    }
    @Query(()=>[User])
    async users():Promise<User[]> {
        return await this.authService.users();
       
    }
}