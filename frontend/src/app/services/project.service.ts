import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Project } from '../models/project';
import { ProjectCreate } from '../models/create/project-create';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  searchProjects(term: string): Observable<Project[]> {
    if (!term.trim) {
      return of([]);
    }
    return this.getProjects().pipe(
      map(x=>x.filter(y=>y.name.includes(term)||y.id === Number.parseInt(term)))
    );
  }
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>('https://localhost:44326/api/Projects');
  }
  createProject(newproj: ProjectCreate): Observable<Project>{
    return this.http.post<Project>('https://localhost:44326/api/Projects', newproj);
  }
  updateProject(newproj: ProjectCreate, id:number): Observable<Project>{
    return this.http.put<Project>('https://localhost:44326/api/Projects/'+id, newproj);
  }
  deleteProject(id:number): Observable<Project>{
    return this.http.delete<Project>('https://localhost:44326/api/Projects/'+id);
  }
}
