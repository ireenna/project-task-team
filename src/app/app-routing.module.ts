import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectPageComponent } from './project/project-page/project-page.component';
import { TaskPageComponent } from './task/task-page/task-page.component';
import { TeamPageComponent } from './team/team-page/team-page.component';
import { UserPageComponent } from './user/user-page/user-page.component';

const routes: Routes = [
  {path: 'projects', component: ProjectPageComponent},
  {path: 'users', component: UserPageComponent},
  {path: 'tasks', component: TaskPageComponent},
  {path: 'teams', component: TeamPageComponent},
  { path: '**', redirectTo: 'projects' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
