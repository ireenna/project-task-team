import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';
import { TasksCreate } from 'src/app/models/create/tasks-create';
import { Project } from 'src/app/models/project';
import { Tasks } from 'src/app/models/tasks';
import { User } from 'src/app/models/user';
import { CustomValidationService } from 'src/app/services/custom-validation.service';
import { ProjectService } from 'src/app/services/project.service';
import { TasksService } from 'src/app/services/tasks.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit, OnChanges {
  registerForm!: FormGroup;
  submitted = false;
  users$!: Observable<User[]>;
  projects$!: Observable<Project[]>;
  editModeItemId:number|undefined = undefined;
  private searchTerms = new Subject<string>();
  private searchTermsProject = new Subject<string>();
  @Input() tasks: Tasks = {} as Tasks;
  @Output() tasksChange = new EventEmitter<Tasks>();
  
  constructor(
    private fb: FormBuilder,
    private customValidator: CustomValidationService,
    private userService: UserService,
    private projectService: ProjectService,
    private tasksService: TasksService
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(2)]],
      description: [''],
      performerId: ['', [Validators.required], this.customValidator.authorValidator.bind(this.customValidator)],
      projectId: ['', Validators.required, this.customValidator.projectValidator.bind(this.customValidator)],
      state: ['', [Validators.required]]
    }
    );
   }

  get registerFormControl() {
    return this.registerForm.controls;
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    if(changes.tasks && this.registerForm){
        this.registerForm.get('name')?.setValue(changes.tasks.currentValue.name)
        this.registerForm.get('description')?.setValue(changes.tasks.currentValue.description)
        this.registerForm.get('performerId')?.setValue(changes.tasks.currentValue.performerId)
        this.registerForm.get('projectId')?.setValue(changes.tasks.currentValue.projectId)
        this.registerForm.get('state')?.setValue(changes.tasks.currentValue.state)
        this.editModeItemId = changes.tasks.currentValue.id
    }
}
  ngOnInit() {
    this.users$ = this.searchTerms.pipe(
      distinctUntilChanged(),
      switchMap((term: string) => this.userService.searchUsers(term)),
    );
    this.projects$ = this.registerForm.get('projectId')!.valueChanges.pipe(
      distinctUntilChanged(),
      switchMap((term: string) => this.projectService.searchProjects(term)),
    );
  }

saveProject(){
  this.submitted = true;
  let newProject = this.registerForm.value;
  if(this.editModeItemId){
    this.tasksService
    .updateTasks(newProject, this.editModeItemId)
    .subscribe(
      response=>{
        const createdProject:Tasks = response;
        this.tasksChange.emit(createdProject);
        alert("The task was successfully updated!");
      }
    )
  }else{
    this.tasksService
  .createTasks(newProject)
  .subscribe(
    response=>{
      const createdProject:Tasks = response;
      this.tasksChange.emit(createdProject);
      alert("The task was successfully created!");
    }
  )
}
  }
  
// Push a search term into the observable stream.
search(term: string): void {
  this.searchTerms.next(term);
}
searchProject(term: string): void {
  console.log(term)
  this.searchTermsProject.next(term);
}
 choosePerformer(user:User){
   this.registerForm.get('performerId')?.setValue(user.id);
 }
 chooseTeam(team:Project){
  this.registerForm.get('projectId')?.setValue(team.id);
}
}
