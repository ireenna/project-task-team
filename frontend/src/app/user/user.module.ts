import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user/user.component';
import { UserPageComponent } from './user-page/user-page.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    UserListComponent,
    UserComponent,
    UserPageComponent,
    UserCreateComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class UserModule { }
