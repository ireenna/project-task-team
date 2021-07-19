import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectComponent } from './project/project.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import { SharedModule } from '../shared/shared.module';
import { ProjectCreateComponent } from './project-create/project-create.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ProjectService } from '../services/project.service';
import { UserService } from '../services/user.service';
import { CustomValidationService } from '../services/custom-validation.service';



@NgModule({
  declarations: [
    ProjectListComponent,
    ProjectComponent,
    ProjectPageComponent,
    ProjectCreateComponent
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
  providers:[ProjectService,
  UserService,
CustomValidationService]
})
export class ProjectModule { }
