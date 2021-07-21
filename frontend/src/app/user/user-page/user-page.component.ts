import { Component, OnInit } from '@angular/core';
import { UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { CanComponentDeactivate } from 'src/app/shared/can-deactivate-create.guard';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit, CanComponentDeactivate {
  
  users: User[] = [];
  selectedProject: User = {} as User;
  selectedProjectIndex: number = -1;
  hideCreateProject: Boolean = true;
  saved:Boolean = true;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(x => {
      this.users = x;
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

    save(newProject: User){
      if(this.selectedProjectIndex === -1){
          this.users.unshift(newProject);
      } else {
          this.users[this.selectedProjectIndex] = newProject;
      }
      this.selectedProjectIndex = -1;
      this.displayCreateProject();
  }
  select(index:number) {
    this.displayCreateProject();
    let project = this.users[index];
    this.selectedProject = {
      id: project.id,
      teamId: project.teamId,
      firstName: project.firstName,
      lastName: project.lastName,
      email: project.email,
      registeredAt:project.registeredAt,
      birthDay:project.birthDay
    };
    this.selectedProjectIndex = index;
  }
  delete(index:number){
    let project = this.users[index];
    this.userService.deleteUsers(project.id)
    .subscribe(response => {
      if(response.id === project.id){
        this.users.splice(index, 1);
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