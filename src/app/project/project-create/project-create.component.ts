import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Team } from 'src/app/models/team';
import { User } from 'src/app/models/user';
import { CustomValidationService } from 'src/app/services/custom-validation.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();
  
  registerForm!: FormGroup;
  submitted = false;
  users$!: Observable<User[]>;
  teams$!: Observable<Team[]>;
  private searchTerms = new Subject<string>();
  private searchTermsTeam = new Subject<string>();

  constructor(
    private fb: FormBuilder,
    private customValidator: CustomValidationService,
    private userService: UserService,
    private teamService: TeamService
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      description: [''],
      authorId: ['', [Validators.required], this.customValidator.authorValidator.bind(this.customValidator)],
      teamId: ['', Validators.required],
      deadline: ['', [Validators.required], this.customValidator.deadlineValidator.bind(this.customValidator)],
      tasks:['', [Validators.required]]
    }
    );
   }

  get registerFormControl() {
    return this.registerForm.controls;
  }
  
  ngOnInit() {
    this.users$ = this.searchTerms.pipe(
      distinctUntilChanged(),
      switchMap((term: string) => this.userService.searchUsers(term)),
    );
    this.teams$ = this.searchTermsTeam.pipe(
      distinctUntilChanged(),
      switchMap((term: string) => this.teamService.searchTeams(term)),
    );
  }
  
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      alert('Form Submitted succesfully!!!\n Check the values in browser console.');
      console.table(this.registerForm.value);
    }
  }
// Push a search term into the observable stream.
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
