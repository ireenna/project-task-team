import { NgModule } from '@angular/core';
import { MaterialComponentsModule } from '../material-component/material-component.module';
import { OrangeColorDirective } from './directives/orange-color.directive';
import { YellowColorDirective } from './directives/yellow-color.directive';
import { MyDateFormatPipe } from './my-date-format.pipe';
import { GreenColorDirective } from './directives/green-color.directive';
import { RedColorDirective } from './directives/red-color.directive';



@NgModule({
  declarations: [
    MyDateFormatPipe,
    YellowColorDirective,
    OrangeColorDirective,
    GreenColorDirective,
    RedColorDirective
  ],
  imports: [],
  exports:[
    MyDateFormatPipe,
    MaterialComponentsModule,
    YellowColorDirective,
    OrangeColorDirective,
    GreenColorDirective,
    RedColorDirective
  ]
})
export class SharedModule { }
