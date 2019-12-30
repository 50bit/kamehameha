import { Controller, Get, Post, Body, Delete, Param, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskService } from './task.service';
import { TaskStatus } from './task-status.enum';
import { SearchDto } from './dto/search.dto';
import { StatusValidationPipe } from './pipes/status-validation.pipe';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUesr } from 'src/auth/user.decoretor';
import { User } from '../auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TaskController {
    constructor(private readonly tasksService : TaskService) {}
    
    // DONE without authorization and search filter
    // @Get()
    // getAllTasks(
    //     @Query() searchDto:SearchDto,
    //     @GetUesr() user:User
    // ):Promise<Task[]>{
    //     return this.tasksService.getTasks(searchDto,user);
    // }
    
  
    @Post()
    @UsePipes(ValidationPipe)
    addTask(
        @Body() createTaskDto : CreateTaskDto,
        @GetUesr() user:User
    ):Promise<Task>{
        console.log("test")
        return this.tasksService.addTask(createTaskDto,user)
    }

    @Delete('/:id')
    deleteTask(
        @Param('id',ParseIntPipe) id:number ,
        @GetUesr() user:User
    ):void{
        this.tasksService.deleteTask(id,user);
        
    }

    // DONE without authorization
    // @Get('/:id')
    // getTaskById(
    //     @Param('id',ParseIntPipe) id:number
    // ):Promise<Task>{
    //     return this.tasksService.getTaskById(id);
    // }

    @Patch('/:id')
    updateTask(
        @Param('id',ParseIntPipe) id:number ,
        @Body() createTaskDto :CreateTaskDto ,
        @GetUesr() user:User
    ):Promise<Task>{
        return this.tasksService.updateTask(id,createTaskDto,user);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id',ParseIntPipe) id:number ,
        @Body('status',StatusValidationPipe) status:TaskStatus ,
        @GetUesr() user:User
    ):Promise<Task>{
        return this.tasksService.updateTaskStatus(id,status,user);
    }
    
}
