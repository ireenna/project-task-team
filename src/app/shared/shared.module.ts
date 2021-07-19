import { NgModule } from '@angular/core';
import { MaterialComponentsModule } from '../material-component/material-component.module';
import { MyDateFormatPipe } from './my-date-format.pipe';



@NgModule({
  declarations: [
    MyDateFormatPipe,
    
  ],
  imports: [],
  exports:[
    MyDateFormatPipe,
    MaterialComponentsModule
  ]
})
export class SharedModule { }
