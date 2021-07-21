import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TasksCreate } from '../models/create/tasks-create';
import { Tasks } from '../models/tasks';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }
  getTasks(): Observable<Tasks[]> {
    return this.http.get<Tasks[]>('https://localhost:44326/api/Tasks');
  }
  createTasks(newproj: TasksCreate): Observable<Tasks>{
    console.log(newproj)
    return this.http.post<Tasks>('https://localhost:44326/api/Tasks', newproj);
  }
  updateTasks(newproj: TasksCreate, id:number): Observable<Tasks>{
    console.log(newproj)
    return this.http.put<Tasks>('https://localhost:44326/api/Tasks/'+id, newproj);
  }
  deleteTasks(id:number): Observable<Tasks>{
    return this.http.delete<Tasks>('https://localhost:44326/api/Tasks/'+id);
  }
}
