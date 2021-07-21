import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Team } from 'src/app/models/team';
import { CustomValidationService } from 'src/app/services/custom-validation.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-create',
  templateUrl: './team-create.component.html',
  styleUrls: ['./team-create.component.css']
})
export class TeamCreateComponent implements OnInit, OnChanges {
  registerForm!: FormGroup;
  submitted = false;
  editModeItemId:number|undefined = undefined;
  @Input() team: Team = {} as Team;
  @Output() teamChange = new EventEmitter<Team>();
  
  constructor(
    private fb: FormBuilder,
    private customValidator: CustomValidationService,
    private teamService: TeamService
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(2)]]
    }
    );
   }

  get registerFormControl() {
    return this.registerForm.controls;
  }
ngOnChanges(changes: SimpleChanges): void {
    if(changes.team && this.registerForm){
        this.registerForm.get('name')?.setValue(changes.team.currentValue.name)
        this.editModeItemId = changes.team.currentValue.id
    }
}
  ngOnInit() {
  }

saveProject(){
  this.submitted = true;
  let newProject = this.registerForm.value;
  if(this.editModeItemId){
    this.teamService
    .updateTeams(newProject, this.editModeItemId)
    .subscribe(
      response=>{
        const createdProject:Team = response;
        this.teamChange.emit(createdProject);
        alert("The team was successfully updated!");
      }
    )
  }else{
    this.teamService
  .createTeams(newProject)
  .subscribe(
    response=>{
      const createdProject:Team = response;
      this.teamChange.emit(createdProject);
      alert("The task was successfully created!");
    }
  )
}
  }
  
}