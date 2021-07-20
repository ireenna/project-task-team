import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  @Input() item!: Project;
  @Input('index') itemIndex!: number;
  @Output() itemSelected =  new EventEmitter<number>();
  
  constructor() { }

  ngOnInit(): void {
  }
  projectSelected(){
    this.itemSelected.emit(this.itemIndex);
}

}
