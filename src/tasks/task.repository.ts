import { Repository, EntityRepository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./DTO/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { SearchDto } from "./DTO/search.dto";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{
    
    async getTasks(searchDto : SearchDto):Promise<Task[]>{
        const {status , search} = searchDto;
        const query = this.createQueryBuilder('task');
        if(status) query.andWhere('task.status = :status',{status})
        if(search) query.andWhere('task.title LIKE :search OR task.description LIKE :search',{search : `%${search}%`})
        const tasks = await query.getMany()

        return tasks;
    }


    async addTask(createTaskDto:CreateTaskDto):Promise<Task>{
        const task = new Task();
        const {title , description} = createTaskDto ;
        task.description = description;
        task.title = title;
        task.status = TaskStatus.OPEN;

        await task.save();

        return task;
    }
    


}