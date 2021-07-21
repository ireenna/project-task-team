import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
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
  
}
