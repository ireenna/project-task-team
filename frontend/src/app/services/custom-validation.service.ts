import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { filter, map } from 'rxjs/operators';
import { UserService } from './user.service';
import { Team } from '../models/team';
import { Project } from '../models/project';
import { TeamService } from './team.service';
import { ProjectService } from './project.service';

@Injectable({
  providedIn: 'root'
})
export class CustomValidationService {
  
  allUsers:User[]=[];
  allTeams:Team[]=[];
  allProjects:Project[]=[];

  constructor(private http: HttpClient,
    private userService:UserService,
    private teamService:TeamService,
    private projectService:ProjectService) {
    this.userService.getUsers().pipe(map(x => {
      x = x.map(b => {return b;
      })
      return x;
  })).subscribe(x => {
      this.allUsers = x;
  }, (error) => {
      console.log(error)
  });
  this.teamService.getTeams().pipe(map(x => {
    x = x.map(b => {return b;
    })
    return x;
})).subscribe(x => {
    this.allTeams = x;
}, (error) => {
    console.log(error)
}); 
this.projectService.getProjects().pipe(map(x => {
  x = x.map(b => {return b;
  })
  return x;
})).subscribe(x => {
  this.allProjects = x;
}, (error) => {
  console.log(error)
}); 
}

deadlineValidator(dateControl: AbstractControl) {
  return new Promise(resolve => {
    setTimeout(() => {
      if (new Date(dateControl.value) > new Date()) {
        resolve(null);
      } else {
        resolve({ deadlineNotAvailable: true });
      }
    }, 1000);
  });
}
birthdayValidator(dateControl: AbstractControl) {
  return new Promise(resolve => {
    setTimeout(() => {
      if (new Date(dateControl.value) < new Date()) {
        resolve(null);
      } else {
        resolve({ birthdayNotAvailable: true });
      }
    }, 1000);
  });
}
teamValidator(teamControl: AbstractControl) {
  return new Promise(resolve => {
    setTimeout(() => {
      if (this.validateAuthor(teamControl.value)) {
        resolve(null);
      } else {
        resolve({ teamNotAvailable: true });
      }
    }, 1000);
  });
}

validateTeam(teamId: string) {
  return this.allTeams.find(x=>x.id === Number.parseInt(teamId));
}
projectValidator(teamControl: AbstractControl) {
  return new Promise(resolve => {
    setTimeout(() => {
      if (this.validateProject(teamControl.value)) {
        resolve(null);
      } else {
        resolve({ projectNotAvailable: true });
      }
    }, 1000);
  });
}

validateProject(teamId: string) {
  return this.allProjects.find(x=>x.id === Number.parseInt(teamId));
}

  authorValidator(userControl: AbstractControl) {
    return new Promise(resolve => {
      setTimeout(() => {
        if (this.validateAuthor(userControl.value)) {
          resolve(null);
        } else {
          resolve({ authorNotAvailable: true });
        }
      }, 1000);
    });
  }

  validateAuthor(userId: string) {
    return this.allUsers.find(x=>x.id === Number.parseInt(userId));
  }
}