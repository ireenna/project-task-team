import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Team } from 'src/app/models/team';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {

  constructor() { }

  @Input('teams') teamList!: Team[];
  @Output() itemSelected =  new EventEmitter<number>();
  @Output() itemSelectedToDelete =  new EventEmitter<number>();

  ngOnInit(): void {
  }

  teamsSelected(index: number){
    this.itemSelected.emit(index);
  }
  teamsSelectedToDelete(index: number){
    this.itemSelectedToDelete.emit(index);
  }
}
