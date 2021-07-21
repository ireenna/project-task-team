import { Component, OnInit } from '@angular/core';
import { UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Tasks } from 'src/app/models/tasks';
import { TasksService } from 'src/app/services/tasks.service';
import { CanComponentDeactivate } from 'src/app/shared/can-deactivate-create.guard';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.css']
})
export class TaskPageComponent implements OnInit, CanComponentDeactivate {
  
  tasks: Tasks[] = [];
  selectedProject: Tasks = {} as Tasks;
  selectedProjectIndex: number = -1;
  hideCreateProject: Boolean = true;
  saved:Boolean = true;

  constructor(private tasksService: TasksService) { }

  ngOnInit(): void {
    this.tasksService.getTasks().subscribe(x => {
      this.tasks = x;
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

    save(newProject: Tasks){
      if(this.selectedProjectIndex === -1){
          this.tasks.unshift(newProject);
      } else {
          this.tasks[this.selectedProjectIndex] = newProject;
      }
      this.selectedProjectIndex = -1;
      this.displayCreateProject();
  }
  select(index:number) {
    this.displayCreateProject();
    let project = this.tasks[index];
    this.selectedProject = {
      id: project.id,
      projectId: project.projectId,
      performerId: project.performerId,
      performer: project.performer,
      name: project.name,
      description: project.description,
      createdAt:project.createdAt,
      state:project.state,
      finishedAt: project.finishedAt
    };
    this.selectedProjectIndex = index;
  }
  delete(index:number){
    let project = this.tasks[index];
    this.tasksService.deleteTasks(project.id)
    .subscribe(response => {
      const deletedProject:Tasks = response;
      if(response.id === project.id){
        this.tasks.splice(index, 1);
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
