import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Tasks } from './tasks.model';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}

    @Get()
    getAllTasks():Tasks[]{
        return this.taskService.getAllTasks();
    }
}
