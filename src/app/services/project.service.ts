import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project';
import { ProjectCreate } from '../models/create/project-create';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  // getProjects(): Observable<Project[]> {
  //   // return [{
  //   //     author: 'Stephen Edwin King',
  //   //     description: 'Jake Epping is a recently divorced high school English teacher in Lisbon Falls, Maine, earning extra money teaching a GED class.',
  //   //     publishedDate: new Date(2011, 11, 8),
  //   //     title: '11/22/63'
  //   // }, {
  //   //     author: 'J. R. R. Tolkien',
  //   //     description: 'The Hobbit is set within Tolkien`s fictional universe and follows the quest of home-loving hobbit Bilbo Baggins to win a share of the treasure guarded by Smaug the dragon.',
  //   //     publishedDate: new Date(1937, 9, 21),
  //   //     title: 'The Hobbit, or There and Back Again'
  //   // }];
  //   return this.http.get<Project[]>('https://localhost:44326/api/Projects');
  // }
  createProject(newproj: ProjectCreate): Observable<Project>{
    return this.http.post<Project>('https://localhost:44326/api/Projects', newproj);
  }
  getProjects(): Project[] {
      return [{
        id: 1,
        authorId: 1,
        author:{
          id: 1,
          teamId: 1,
          firstName: 'First name author',
          lastName: 'Surname author',
          email: 'somemail@gmail.com',
          registeredAt: new Date(2002,1,1),
          birthDay: new Date(1999,1,1)
        },
        teamId: 1,
        team: {
          id: 1,
          name: 'Dream team',
          createdAt: new Date(2002,1,1),
          participants:[{
            id: 1,
            teamId: 1,
            firstName: 'First name author',
            lastName: 'Surname author',
            email: 'somemail@gmail.com',
            registeredAt: new Date(2002,1,1),
            birthDay: new Date(1999,1,1)
          }]
        },
        name: 'Such a nice big PROOOOOOOOJECTTTTTTTTTTTTTTTTTTTT',
        description: 'Jake Epping is a recently divorced high schoollllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll English teacher in Lisbon Falls, Maine, earning extra money teaching a GED class. AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
        deadline: new Date(2022, 11, 8),
        createdAt: new Date(2020,1,1),
        tasks:[{
          id:1,
          projectId:1,
          performerId: 1,
          performer:{
            id: 1,
            teamId: 1,
            firstName: 'First name author',
            lastName: 'Surname author',
            email: 'somemail@gmail.com',
            registeredAt: new Date(2002,1,1),
            birthDay: new Date(1999,1,1)
          },
          name: 'such a cool task!',
          description: 'you need to do BSA hw',
          state: 1,
          createdAt: new Date(2021,1,1)
        }]
      },{
        id: 1,
        authorId: 1,
        author:{
          id: 1,
          teamId: 1,
          firstName: 'First name author',
          lastName: 'Surname author',
          email: 'somemail@gmail.com',
          registeredAt: new Date(2002,1,1),
          birthDay: new Date(1999,1,1)
        },
        teamId: 1,
        team: {
          id: 1,
          name: 'Dream team',
          createdAt: new Date(2002,1,1),
          participants:[{
            id: 1,
            teamId: 1,
            firstName: 'First name author',
            lastName: 'Surname author',
            email: 'somemail@gmail.com',
            registeredAt: new Date(2002,1,1),
            birthDay: new Date(1999,1,1)
          }]
        },
        name: 'First project',
        description: 'Jake Epping is a recently divorced high school English teacher in Lisbon Falls, Maine, earning extra money teaching a GED class.',
        deadline: new Date(2022, 11, 8),
        createdAt: new Date(2020,1,1),
        tasks:[{
          id:1,
          projectId:1,
          performerId: 1,
          performer:{
            id: 1,
            teamId: 1,
            firstName: 'First name author',
            lastName: 'Surname author',
            email: 'somemail@gmail.com',
            registeredAt: new Date(2002,1,1),
            birthDay: new Date(1999,1,1)
          },
          name: 'such a cool task!',
          description: 'you need to do BSA hw',
          state: 1,
          createdAt: new Date(2021,1,1)
        }]
      }];
    }
}
