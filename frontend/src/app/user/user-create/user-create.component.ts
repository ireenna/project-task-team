import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Team } from 'src/app/models/team';
import { User } from 'src/app/models/user';
import { CustomValidationService } from 'src/app/services/custom-validation.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit, OnChanges {
  registerForm!: FormGroup;
  submitted = false;
  teams$!: Observable<Team[]>;
  editModeItemId:number|undefined = undefined;
  private searchTermsTeam = new Subject<string>();
  @Input() user: User = {} as User;
  @Output() userChange = new EventEmitter<User>();
  
  constructor(
    private fb: FormBuilder,
    private customValidator: CustomValidationService,
    private userService: UserService,
    private teamService: TeamService
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      teamId: ['', Validators.required, this.customValidator.teamValidator.bind(this.customValidator)],
      birthDay: ['', [Validators.required], this.customValidator.birthdayValidator.bind(this.customValidator)]
    }
    );
   }

  get registerFormControl() {
    return this.registerForm.controls;
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    if(changes.user && this.registerForm){
        this.registerForm.get('firstName')?.setValue(changes.user.currentValue.firstName)
        this.registerForm.get('lastName')?.setValue(changes.user.currentValue.lastName)
        this.registerForm.get('email')?.setValue(changes.user.currentValue.email)
        this.registerForm.get('teamId')?.setValue(changes.user.currentValue.teamId)
        this.registerForm.get('birthDay')?.setValue(changes.user.currentValue.birthDay)
        this.editModeItemId = changes.user.currentValue.id
    }
}
  ngOnInit() {
    this.teams$ = this.registerForm.get('teamId')!.valueChanges.pipe(
      distinctUntilChanged(),
      switchMap((term: string) => this.teamService.searchTeams(term)),
    );
  }

saveProject(){
  this.submitted = true;
  let newProject = this.registerForm.value;
  if(this.editModeItemId){
    this.userService
    .updateUsers(newProject, this.editModeItemId)
    .subscribe(
      response=>{
        const createdProject:User = response;
        this.userChange.emit(createdProject);
        alert("The user was successfully updated!");
      }
    )
  }else{
    this.userService
  .createUsers(newProject)
  .subscribe(
    response=>{
      const createdProject:User = response;
      this.userChange.emit(createdProject);
      alert("The project was successfully created!");
    }
  )
}
  }
  
searchTeam(term: string): void {
  this.searchTermsTeam.next(term);
}
 chooseTeam(team:Team){
  this.registerForm.get('teamId')?.setValue(team.id);
}
}
