import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../tasks.model';

@Injectable()
export class StatusValidationPipe implements PipeTransform {
  readonly AllowedStatus =[
    TaskStatus.OPEN,
    TaskStatus.CLOSED,
    TaskStatus.IN_PROGRESS
  ]
  transform(value: any) {
    if(!this.isValidStatus(value)){
      throw new BadRequestException();
    }else{
      return value
    }
  }

  private isValidStatus(status:any){
    const index = this.AllowedStatus.indexOf(status)
    console.log(index)
    return index != -1;
  }
}
