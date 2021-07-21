import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Team } from '../models/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }

  searchTeams(term: string): Observable<Team[]> {
    if (!term.trim) {
      return of([]);
    }
    return this.getTeams().pipe(
      map(x=>x.filter(y=>y.name.includes(term)||y.id === Number.parseInt(term)))
    );
  }
  getTeams():Observable<Team[]>{
    return this.http.get<Team[]>('https://localhost:44326/api/teams');
  }
}
