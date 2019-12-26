import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus} from './task-status.enum';
import { CreateTaskDto } from './DTO/create-task.dto';
import * as uuid  from 'uuid/v1';
import { SearchDto } from './DTO/search.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';


@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository : TaskRepository
    ){}

    async getTasks(searchDto : SearchDto):Promise<Task[]>{
        return this.taskRepository.getTasks(searchDto)
    }

    async getTaskById(id:number){
        const found = await this.taskRepository.findOne(id);
        if(!found){
            throw new NotFoundException(`task with ID ${id} not found`);
        }
        return found
    }

    async addTask(createTaskDto:CreateTaskDto):Promise<Task>{
        return this.taskRepository.addTask(createTaskDto);
    }

    async deleteTask(id : number):Promise<void>{
        const result = await this.taskRepository.delete(id);
    }
    

    async updateTask(id:number , createTaskDto:CreateTaskDto):Promise<Task>{
        const {title , description} = createTaskDto ;
        const task = await this.getTaskById(id);

        if(title) task.title = title;
        if(description) task.description = description ;
        
        await task.save()

        return task;
    }

    async updateTaskStatus(id:number , taskStatus:TaskStatus):Promise<Task>{
        const task = await this.getTaskById(id);
        task.status = taskStatus ;
        await task.save();

        return task;
    }

}
