import { NgModule } from '@angular/core';
import { MyDateFormatPipe } from './my-date-format.pipe';
import { ProjectModule } from '../project/project.module';
import { TeamModule } from '../team/team.module';
import { TaskModule } from '../task/task.module';
import { UserModule } from '../user/user.module';



@NgModule({
  declarations: [
    MyDateFormatPipe
  ],
  imports: [
    // ProjectModule,
    // TeamModule,
    // TaskModule,
    // UserModule
  ],
  exports:[
    MyDateFormatPipe
  ]
})
export class SharedModule { }
