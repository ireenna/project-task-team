import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { TaskListComponent } from './task/task-list/task-list.component';
import { UserListComponent } from './user/user-list/user-list.component';

const routes: Routes = [
  {path: 'projects', component: ProjectListComponent},
  {path: 'users', component: UserListComponent},
  {path: 'tasks', component: TaskListComponent},
  { path: '**', redirectTo: 'projects' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
