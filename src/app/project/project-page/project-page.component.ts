import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit {

  projects: Project[] = [];

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

}
