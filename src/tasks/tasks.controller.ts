import { Controller, Get, Post, Body, Delete, Param, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDto } from './DTO/create-task.dto';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { SearchDto } from './DTO/search.dto';
import { StatusValidationPipe } from './pipes/status-validation.pipe';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService : TasksService) {}

    @Get()
    getAllTasks(@Query() searchDto:SearchDto):Task[]{

        if(Object.keys(searchDto).length){
            console.log(searchDto);
            return this.tasksService.searchTask(searchDto)
        }
        else{
            return this.tasksService.getAllTasks();
        }
        
    }
  
    @Post()
    @UsePipes(ValidationPipe)
    addTask(@Body() createTaskDto : CreateTaskDto):Task{
        return this.tasksService.addTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id:string ):void{
        this.tasksService.deleteTask(id);
        
    }

    @Get('/:id')
    getTaskById(@Param('id') id:string){
        return this.tasksService.getTaskById(id);
    }

    @Patch('/:id')
    updateTask(
        @Param('id') id:string ,
        @Body() createTaskDto :CreateTaskDto 
    ):Task{
        return this.tasksService.updateTask(id,createTaskDto);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id:string ,
        @Body('status',StatusValidationPipe) status:TaskStatus 
    ):Task{
        return this.tasksService.updateTaskStatus(id,status);
    }
    
}
