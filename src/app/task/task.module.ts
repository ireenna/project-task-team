import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskComponent } from './task/task.component';
import { TaskPageComponent } from './task-page/task-page.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    TaskListComponent,
    TaskComponent,
    TaskPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class TaskModule { }
