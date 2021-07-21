import { Component, OnInit } from '@angular/core';
import { UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Team } from 'src/app/models/team';
import { TeamService } from 'src/app/services/team.service';
import { CanComponentDeactivate } from 'src/app/shared/can-deactivate-create.guard';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.css']
})
export class TeamPageComponent implements OnInit, CanComponentDeactivate {
  
  teams: Team[] = [];
  selectedProject: Team = {} as Team;
  selectedProjectIndex: number = -1;
  hideCreateProject: Boolean = true;
  saved:Boolean = true;

  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
    this.teamService.getTeams().subscribe(x => {
      this.teams = x;
  }, (error) => {
      console.log(error)
  });
  }


  canDeactivate() : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
     
    if(!this.saved){
        return confirm("You may have some unsaved data. Do you want to leave the page?");
    }
    else{
        return true;
    }
}

    save(newProject: Team){
      if(this.selectedProjectIndex === -1){
          this.teams.unshift(newProject);
      } else {
          this.teams[this.selectedProjectIndex] = newProject;
      }
      this.selectedProjectIndex = -1;
      this.displayCreateProject();
  }
  select(index:number) {
    this.displayCreateProject();
    let project = this.teams[index];
    this.selectedProject = {
      id: project.id,
      name: project.name,
      createdAt:project.createdAt
    };
    this.selectedProjectIndex = index;
  }
  delete(index:number){
    let project = this.teams[index];
    this.teamService.deleteTeams(project.id)
    .subscribe(response => {
      const deletedProject:Team = response;
      if(response.id === project.id){
        this.teams.splice(index, 1);
        alert("The project was successfully deleted!")
      }
  }, (error) => {
      console.log(error)
  });
  }
  displayCreateProject(){
    
    this.hideCreateProject = !this.hideCreateProject;
    if(!this.hideCreateProject){
      this.saved = false;
    }else{
      this.saved = true;
    }
  }
}
