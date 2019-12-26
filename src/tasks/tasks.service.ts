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
            throw new NotFoundException(`task with ID not found`);
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
    
}
