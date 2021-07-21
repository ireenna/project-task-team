import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() item!: User;
  @Input('index') itemIndex!: number;
  @Output() itemSelected =  new EventEmitter<number>();
  @Output() itemSelectedToDelete =  new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }
  userSelected(){
    this.itemSelected.emit(this.itemIndex);
  }
  userSelectedToDelete(){
    this.itemSelectedToDelete.emit(this.itemIndex);
  }
}
