import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Team } from 'src/app/models/team';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  @Input() item!: Team;
  @Input('index') itemIndex!: number;
  @Output() itemSelected =  new EventEmitter<number>();
  @Output() itemSelectedToDelete =  new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }
  teamSelected(){
    this.itemSelected.emit(this.itemIndex);
}
teamSelectedToDelete(){
  this.itemSelectedToDelete.emit(this.itemIndex);
}

}
