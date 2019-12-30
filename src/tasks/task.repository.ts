import { Repository, EntityRepository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { SearchDto } from "./dto/search.dto";
import { User } from "src/auth/user.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{
    
    // async getTasks(
    //     searchDto : SearchDto,
    //     user:User
    // ):Promise<Task[]>{
    //     const {status , search} = searchDto;
    //     const query = this.createQueryBuilder('task');
    //     query.where('task.userId = :userId',{userId : user.id});
    //     if(status) query.andWhere('task.status = :status',{status})
    //     if(search) query.andWhere('task.title LIKE :search OR task.description LIKE :search',{search : `%${search}%`})
    //     const tasks = await query.getMany()

    //     return tasks;
    // }

    async getTasks(
        searchDto : SearchDto,
    ):Promise<Task[]>{
        const {search} = searchDto;
        const query = this.createQueryBuilder('task');
        if(search) query.andWhere('task.title LIKE :search OR task.description LIKE :search',{search : `%${search}%`})
        const tasks = await query.getMany()

        return tasks;
    }


    async addTask(createTaskDto:CreateTaskDto,user:User):Promise<Task>{
        const task = new Task();
        const {title , description} = createTaskDto ;
        task.description = description;
        task.title = title;
        task.status = TaskStatus.OPEN;
        task.user = user;
        await task.save();
        delete task.user;
        return task;
    }
    


}