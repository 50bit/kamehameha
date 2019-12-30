import { Resolver, Query, Args } from "@nestjs/graphql";
import { TaskService } from "../task.service";
import { Task } from "../task.entity";
import { SearchDto } from "../dto/search.dto";
import { User } from "src/auth/user.entity";

@Resolver()
export class TaskResolver {
    constructor(private taskService : TaskService){

    }

    

    @Query(() => String)
    async test() {
        return 'test'
    }

    @Query(() => [Task])
    async tasks() {
        return await this.taskService.getAllTasks();
    }
   
    // @Query(()=>Task)
    // async taskById(@Args('id') id: number){
    //     return await this.taskService.getTaskById(id);
    // }

    // @Query(()=>Task)
    // async getTasksBy(@Args('seachDto') searchDto:SearchDto){
    //     return await this.taskService.getTasks(searchDto);
    // }
  
    
}