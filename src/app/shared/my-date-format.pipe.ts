import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myDateFormat'
})
export class MyDateFormatPipe implements PipeTransform {

  transform(date: any, ...args: any[]): any {
    if(date){
      return new DatePipe('en-US').transform(date, 'd MMMM YYYY'); //instead of writing all the time: | date:'d MMMM YYYY'
    }
    
  }

}
