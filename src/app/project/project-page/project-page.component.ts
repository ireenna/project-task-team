import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { map } from 'rxjs/operators';
import { CanComponentDeactivate } from 'src/app/shared/can-deactivate-create.guard';
import { Observable } from 'rxjs';
import { UrlTree } from '@angular/router';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css'],
  providers:[ProjectService]
})
export class ProjectPageComponent implements OnInit, CanComponentDeactivate {
  
  projects: Project[] = [];
  selectedProject: Project = {} as Project;
  selectedProjectIndex: number = -1;
  hideCreateProject: Boolean = true;
  saved:Boolean = true;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(x => {
      this.projects = x;
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

    save(newProject: Project){
      if(this.selectedProjectIndex === -1){
          this.projects.unshift(newProject);
      } else {
          this.projects[this.selectedProjectIndex] = newProject;
      }
      this.selectedProjectIndex = -1;
      this.displayCreateProject();
  }
  select(index:number) {
    this.displayCreateProject();
    let project = this.projects[index];
    this.selectedProject = {
      id: project.authorId,
      author: project.author,
      authorId: project.authorId,
      teamId: project.teamId,
      team: project.team,
      name: project.name,
      description: project.description,
      deadline:project.deadline,
      createdAt:project.createdAt,
      tasks:project.tasks
    };
    this.selectedProjectIndex = index;
  }
  delete(index:number){
    let project = this.projects[index];
    this.projectService.deleteProject(project.id)
    .subscribe(response => {
      const deletedProject:Project = response;
      if(response.id === project.id){
        this.projects.splice(index, 1);
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
