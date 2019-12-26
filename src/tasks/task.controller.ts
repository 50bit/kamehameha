import { Controller, Get, Post, Body, Delete, Param, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { CreateTaskDto } from './DTO/create-task.dto';
import { TaskService } from './task.service';
import { TaskStatus } from './task-status.enum';
import { SearchDto } from './DTO/search.dto';
import { StatusValidationPipe } from './pipes/status-validation.pipe';
import { Task } from './task.entity';

@Controller('tasks')
export class TaskController {
    constructor(private readonly tasksService : TaskService) {}

    @Get()
    getAllTasks(@Query() searchDto:SearchDto):Promise<Task[]>{
        return this.tasksService.getTasks(searchDto);
    }
  
    @Post()
    @UsePipes(ValidationPipe)
    addTask(@Body() createTaskDto : CreateTaskDto):Promise<Task>{
        console.log("test")
        return this.tasksService.addTask(createTaskDto)
    }

    @Delete('/:id')
    deleteTask(@Param('id',ParseIntPipe) id:number ):void{
        this.tasksService.deleteTask(id);
        
    }

    @Get('/:id')
    getTaskById(@Param('id',ParseIntPipe) id:number):Promise<Task>{
        return this.tasksService.getTaskById(id);
    }

    @Patch('/:id')
    updateTask(
        @Param('id',ParseIntPipe) id:number ,
        @Body() createTaskDto :CreateTaskDto 
    ):Promise<Task>{
        return this.tasksService.updateTask(id,createTaskDto);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id',ParseIntPipe) id:number ,
        @Body('status',StatusValidationPipe) status:TaskStatus 
    ):Promise<Task>{
        return this.tasksService.updateTaskStatus(id,status);
    }
    
}
