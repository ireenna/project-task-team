import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamComponent } from './team/team.component';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamPageComponent } from './team-page/team-page.component';



@NgModule({
  declarations: [
    TeamComponent,
    TeamListComponent,
    TeamPageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TeamModule { }
