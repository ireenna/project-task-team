import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tasks } from 'src/app/models/tasks';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() item!: Tasks;
  @Input('index') itemIndex!: number;
  @Output() itemSelected =  new EventEmitter<number>();
  @Output() itemSelectedToDelete =  new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }
  projectSelected(){
    this.itemSelected.emit(this.itemIndex);
}
projectSelectedToDelete(){
  this.itemSelectedToDelete.emit(this.itemIndex);
}

}
