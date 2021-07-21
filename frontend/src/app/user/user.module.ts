import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user/user.component';
import { UserPageComponent } from './user-page/user-page.component';



@NgModule({
  declarations: [
    UserListComponent,
    UserComponent,
    UserPageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
