import { TaskStatus } from "../task-status.enum";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class SearchDto {
    @Field(type=>String)
    status : string ;
    @Field(type=>String)
    search : string ;

}