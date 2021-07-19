import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css'],
  providers:[ProjectService]
})
export class ProjectPageComponent implements OnInit {
  
  projects: Project[] = [];
  selectedProject: Project = {} as Project;
  selectedProjectIndex: number = -1;
  hideCreateProject: Boolean = true;

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

    save(newProject: Project){
      if(this.selectedProjectIndex === -1){
          this.projects.push(newProject);
      } else {
          this.projects[this.selectedProjectIndex] = newProject;
      }
      this.selectedProjectIndex = -1;
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
  }
}
