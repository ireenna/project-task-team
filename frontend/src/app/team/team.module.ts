import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamComponent } from './team/team.component';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamPageComponent } from './team-page/team-page.component';
import { TeamCreateComponent } from './team-create/team-create.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    TeamComponent,
    TeamListComponent,
    TeamPageComponent,
    TeamCreateComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class TeamModule { }
