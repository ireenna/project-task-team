import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor() { }

  @Input('users') userList!: User[];
  @Output() itemSelected =  new EventEmitter<number>();
  @Output() itemSelectedToDelete =  new EventEmitter<number>();

  ngOnInit(): void {
  }

  userSelected(index: number){
    this.itemSelected.emit(index);
  }
  userSelectedToDelete(index: number){
    this.itemSelectedToDelete.emit(index);
  }
}

