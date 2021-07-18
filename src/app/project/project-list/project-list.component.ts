import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  constructor() { }

  title = 'Projects:';

  @Input('projects') projectsList: Project[] |undefined;
  // @Output() itemSelected =  new EventEmitter<number>();

  ngOnInit(): void {
  }

}
