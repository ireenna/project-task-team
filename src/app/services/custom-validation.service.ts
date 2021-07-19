import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { filter, map } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CustomValidationService {
  
  allUsers:User[]=[];

  constructor(private http: HttpClient, private userService:UserService) {
    this.userService.getUsers().pipe(map(x => {
      x = x.map(b => {return b;
      })
      return x;
  })).subscribe(x => {
      this.allUsers = x;
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
        console.log(dateControl.value)
        console.log(dateControl)
        console.log(dateControl.value as Date)
        resolve({ deadlineNotAvailable: true });
      }
    }, 1000);
  });
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