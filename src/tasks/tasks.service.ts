import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDTO } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks : Task[] = [];

    getAllTasks():Task[]{
        return this.tasks;
    }

    createTask(createTaskDTO : CreateTaskDTO): Task{
        const { title , description } = createTaskDTO ; 
        const task: Task = {
            id : uuid(),
            title  ,
            description,
            status: TaskStatus.OPEN
        };
        this.tasks.push(task);
        return task;
    }

    getTaskById(id: string):Task{
        return this.tasks.find(task=> task.id === id); 
    }
}
