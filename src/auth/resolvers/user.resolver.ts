import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { User } from "src/auth/user.entity";
import { AuthService } from "../auth.service";
import { AuthDto } from "../dto/auth.dto";

@Resolver('User')
export class UserResolver {
    constructor(private authService:AuthService){

    }

    @Query(()=>[User])
    async users():Promise<User[]> {
        return await this.authService.users();
    }
    @Query(()=>User)
    async getUserById(@Args('id') id:number):Promise<User>{
        return await this.authService.getUserById(id);
    }


    @Mutation()
    async signIn(
        @Args('username') username:string ,
        @Args('password') password:string
    ){
        const user : AuthDto = {username ,password};
        return await this.authService.signIn(user);
    }

    @Mutation()
    async signUp(
        @Args('username') username:string ,
        @Args('password') password:string
    ){
        const user : AuthDto = {username ,password};
        return await this.authService.signUp(user);
    }



}