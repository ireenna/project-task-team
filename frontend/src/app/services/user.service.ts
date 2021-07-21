import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { UserCreate } from '../models/create/user-create';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  searchUsers(term: string): Observable<User[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.getUsers().pipe(
      map(x=>x.filter(y=>y.firstName.includes(term)||y.lastName.includes(term)||y.id === Number.parseInt(term)))
    );
  }
  getUsers():Observable<User[]>{
    return this.http.get<User[]>('https://localhost:44326/api/Users');
  }
  createUsers(newproj: UserCreate): Observable<User>{
    return this.http.post<User>('https://localhost:44326/api/Users', newproj);
  }
  updateUsers(newproj: UserCreate, id:number): Observable<User>{
    return this.http.put<User>('https://localhost:44326/api/Users/'+id, newproj);
  }
  deleteUsers(id:number): Observable<User>{
    return this.http.delete<User>('https://localhost:44326/api/Users/'+id);
  }
}
