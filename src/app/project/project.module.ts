import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectComponent } from './project/project.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ProjectListComponent,
    ProjectComponent,
    ProjectPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[
    ProjectPageComponent,
    ProjectListComponent,
    ProjectComponent
  ],
  providers:[]
})
export class ProjectModule { }
