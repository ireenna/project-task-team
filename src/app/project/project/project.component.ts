import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  @Input() item: Project | undefined;
  @Input('index') itemIndex: number | undefined;
  
  constructor() { }

  ngOnInit(): void {
  }

}
