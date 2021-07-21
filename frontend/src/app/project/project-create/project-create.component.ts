import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs/operators';
import { Project } from 'src/app/models/project';
import { Team } from 'src/app/models/team';
import { User } from 'src/app/models/user';
import { CustomValidationService } from 'src/app/services/custom-validation.service';
import { ProjectService } from 'src/app/services/project.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit, OnChanges {
  registerForm!: FormGroup;
  submitted = false;
  users$!: Observable<User[]>;
  teams$!: Observable<Team[]>;
  editModeItemId:number|undefined = undefined;
  private searchTerms = new Subject<string>();
  private searchTermsTeam = new Subject<string>();
  @Input() project: Project = {} as Project;
  @Output() projectChange = new EventEmitter<Project>();
  
  constructor(
    private fb: FormBuilder,
    private customValidator: CustomValidationService,
    private userService: UserService,
    private teamService: TeamService,
    private projectService: ProjectService
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(2)]],
      description: [''],
      authorId: ['', [Validators.required], this.customValidator.authorValidator.bind(this.customValidator)],
      teamId: ['', Validators.required, this.customValidator.teamValidator.bind(this.customValidator)],
      deadline: ['', [Validators.required], this.customValidator.deadlineValidator.bind(this.customValidator)]
    }
    );
   }

  get registerFormControl() {
    return this.registerForm.controls;
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    if(changes.project && this.registerForm){
        this.registerForm.get('name')?.setValue(changes.project.currentValue.name)
        this.registerForm.get('description')?.setValue(changes.project.currentValue.description)
        this.registerForm.get('authorId')?.setValue(changes.project.currentValue.authorId)
        this.registerForm.get('teamId')?.setValue(changes.project.currentValue.teamId)
        this.registerForm.get('deadline')?.setValue(changes.project.currentValue.deadline)
        this.editModeItemId = changes.project.currentValue.id
    }
}
  ngOnInit() {
    this.users$ = this.searchTerms.pipe(
      distinctUntilChanged(),
      switchMap((term: string) => this.userService.searchUsers(term)),
    );
    this.teams$ = this.registerForm.get('teamId')!.valueChanges.pipe(
      distinctUntilChanged(),
      switchMap((term: string) => this.teamService.searchTeams(term)),
    );
  }

saveProject(){
  this.submitted = true;
  console.log('Emit event');
  let newProject = this.registerForm.value;
  if(this.editModeItemId){
    this.projectService
    .updateProject(newProject, this.editModeItemId)
    .subscribe(
      response=>{
        const createdProject:Project = response;
        this.projectChange.emit(createdProject);
        alert("The project was successfully updated!");
      }
    )
  }else{
    this.projectService
  .createProject(newProject)
  .subscribe(
    response=>{
      const createdProject:Project = response;
      this.projectChange.emit(createdProject);
      alert("The project was successfully created!");
    }
  )
}
  }
  
search(term: string): void {
  this.searchTerms.next(term);
}
searchTeam(term: string): void {
  this.searchTermsTeam.next(term);
}
 chooseAuthor(user:User){
   this.registerForm.get('authorId')?.setValue(user.id);
 }
 chooseTeam(team:Team){
  this.registerForm.get('teamId')?.setValue(team.id);
}
}
