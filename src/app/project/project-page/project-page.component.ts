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
  //   this.projectService.getProjects().pipe(map(x => {
  //     x = x.map(b => {
  //         // b.publish_date = new Date(b.publish_date);
  //         // if(!b.description || !b.description.value){
  //         //     b.description = { value: "No description" }
  //         // }
  //         return b;
  //     })
  //     return x;
  // })).subscribe(x => {
  //     this.projects = x;
  // }, (error) => {
  //     console.log(error)
  // });
  this.projects = this.projectService.getProjects();
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
          this.projects.push(newProject);
      } else {
          this.projects[this.selectedProjectIndex] = newProject;
      }
      this.selectedProjectIndex = -1;
      this.saved = true;
  }
  select(event: Event) {
    console.log(event)
    // let index=id;
    // let project = this.projects[index];
    // this.selectedProject = {
    //   id: project.authorId,
    //   author: project.author,
    //   authorId: project.authorId,
    //   teamId: project.teamId,
    //   team: project.team,
    //   name: project.name,
    //   description: project.description,
    //   deadline:project.deadline,
    //   createdAt:project.createdAt,
    //   tasks:project.tasks
    // };
    // this.selectedProjectIndex = index;
    // console.log(this.selectedProject)
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
