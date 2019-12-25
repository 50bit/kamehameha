import { Injectable, NotFoundException } from '@nestjs/common';
import { Task , TaskStatus} from './tasks.model';
import { CreateTaskDto } from './DTO/create-task.dto';
import * as uuid  from 'uuid/v1';
import { SearchDto } from './DTO/search.dto';


@Injectable()
export class TasksService {

    private task : Task[] = [];
    
    getAllTasks():Task[]{
        return this.task;
    }

    getTaskById(id:string):Task{
        const task = this.task.find(task => task.id === id)
        if(!task){
            throw new NotFoundException();
        }
        return task ;
    }

    addTask(createTaskDto : CreateTaskDto):Task{
        const { title , description } = createTaskDto ;
        const task = {
            id: uuid(),
            title,
            description,
            status : TaskStatus.OPEN
        }
        this.task.push(task);
        return task;
    }

    deleteTask(id : string){
        const task = this.getTaskById(id);
        this.task = this.task.filter(task => task.id !== id)
    }

    updateTaskStatus(id:string , status : TaskStatus) : Task{
        const task = this.getTaskById(id);
        task.status = status ;
        return  task ;
    }

    updateTask(id : string , createTaskDto : CreateTaskDto ):Task{
        const index = this.task.findIndex(task => task.id === id)
        const { title , description } = createTaskDto ; 
        this.task[index].title = title;
        this.task[index].description = description;
        return this.task[index] ;
    }    

    searchTask(searchDto : SearchDto):Task[]{
        let task = this.getAllTasks() ;
        const { status , search } = searchDto ;
        if(status){
            task = task.filter(task => task.status == status )
        }
        if(search){
            task = task.filter(task => task.title.includes(search))
        }
        return task
    }
}
