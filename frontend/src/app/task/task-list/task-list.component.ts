import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tasks } from 'src/app/models/tasks';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  constructor() { }

  @Input('tasks') tasksList!: Tasks[];
  @Output() itemSelected =  new EventEmitter<number>();
  @Output() itemSelectedToDelete =  new EventEmitter<number>();

  ngOnInit(): void {
  }

  tasksSelected(index: number){
    this.itemSelected.emit(index);
  }
  tasksSelectedToDelete(index: number){
    this.itemSelectedToDelete.emit(index);
  }
}
