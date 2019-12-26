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

    async getTaskById(id:number){
        const found = await this.taskRepository.findOne(id);
        if(!found){
            throw new NotFoundException(`task with ID ${id} not found`);
        }
        return found
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

    async deleteTask(id : number):Promise<void>{
        const result = await this.taskRepository.delete(id);
    }
    

    async updateTask(id:number , createTaskDto:CreateTaskDto):Promise<Task>{
        const {title , description} = createTaskDto ;
        const task = await this.getTaskById(id);
        task.title = title;
        task.description = description ;
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
