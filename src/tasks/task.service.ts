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

    // async getTasks(searchDto : SearchDto, user:User):Promise<Task[]>{
    //     return await this.taskRepository.getTasks(searchDto,user)
    // }

    async getAllTasks():Promise<Task[]>{
        console.log(await this.taskRepository.find())
        return await this.taskRepository.find();
    }

    async getTasks(searchDto : SearchDto):Promise<Task[]>{
        return await this.taskRepository.getTasks(searchDto)
    }

    async getTaskById(id:number){
        const found = await this.taskRepository.findOne(id);
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
        const task = await this.getTaskById(id);

        if(title) task.title = title;
        if(description) task.description = description ;
        
        await task.save()

        return task;
    }

    async updateTaskStatus(id:number , taskStatus:TaskStatus,user:User):Promise<Task>{
        const task = await this.getTaskById(id);
        task.status = taskStatus ;
        await task.save();

        return task;
    }

}
