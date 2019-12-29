import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus} from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { SearchDto } from './dto/search.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';


@Injectable()
export class TaskService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository : TaskRepository
    ){}

    async getTasks(searchDto : SearchDto, user:User):Promise<Task[]>{
        return this.taskRepository.getTasks(searchDto,user)
    }

    async getTaskById(id:number,user:User){
        const found = await this.taskRepository.findOne({where:{id , userId:user.id}});
        if(!found){
            throw new NotFoundException(`task with ID ${id} not found`);
        }
        return found
    }

    async addTask(createTaskDto:CreateTaskDto,user:User):Promise<Task>{
        return this.taskRepository.addTask(createTaskDto,user);
    }

    async deleteTask(id : number,user:User):Promise<void>{
        const result = await this.taskRepository.delete({id,userId:user.id});
    }
    

    async updateTask(id:number , createTaskDto:CreateTaskDto,user:User):Promise<Task>{
        const {title , description} = createTaskDto ;
        const task = await this.getTaskById(id,user);

        if(title) task.title = title;
        if(description) task.description = description ;
        
        await task.save()

        return task;
    }

    async updateTaskStatus(id:number , taskStatus:TaskStatus,user:User):Promise<Task>{
        const task = await this.getTaskById(id,user);
        task.status = taskStatus ;
        await task.save();

        return task;
    }

}
