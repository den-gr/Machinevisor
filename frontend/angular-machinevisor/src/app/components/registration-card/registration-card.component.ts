import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { APIService } from 'src/app/utilities/services/APIService/api.service';
import { AuthService } from 'src/app/utilities/services/authService/auth.service';
import { NavigationService } from 'src/app/utilities/services/navigationService/navigation.service';

export interface ValidationResult {
  [key: string]: boolean;
}

export class PasswordValidator {

  public static strong(control: FormControl): ValidationResult {
      let hasNumber = /\d/.test(control.value);
      let hasUpper = /[A-Z]/.test(control.value);
      let hasLower = /[a-z]/.test(control.value);
      const valid = hasNumber && hasUpper && hasLower;
      return valid ? null as any : { strong: true };
  }

  public static checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass: string = group.get('password')?.value;
    let confirmPass: string = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { notSame: true }
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidParent = !!(
      control
      && control.parent
      && control.parent.invalid
      && control.parent.dirty
      && control.parent.hasError('notSame'));
    return (invalidParent);
  }
}

@Component({
  selector: 'app-registration-card',
  templateUrl: './registration-card.component.html',
  styleUrls: ['./registration-card.component.scss'],
  providers: [DatePipe]
})
export class RegistrationCardComponent implements OnInit {

  today = new Date();
  maxDate: any;
  errorReg = false;

  myForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), PasswordValidator.strong]),
    confirmPassword: new FormControl('', [Validators.required])
  }, { validators: PasswordValidator.checkPasswords })

  matcher = new MyErrorStateMatcher();

  constructor(private datePipe: DatePipe, private navService: NavigationService, private apiService: APIService, private authService: AuthService) { }

  onSubmit(){
    console.log("REGISTRATION");
    const user = this.myForm.get('email');
    const name = this.myForm.get('name');
    const surname = this.myForm.get('surname');
    const date = this.myForm.get('date');
    const psw = this.myForm.get('password');
    const confirmPsw = this.myForm.get('confirmPassword');

    if(user?.value !== '' && name?.value !== '' && surname?.value !== '' && date?.value !== '' && psw?.value !== '' && confirmPsw?.value !== ''){
      
      if(psw?.value === confirmPsw?.value){ 
        this.apiService.signUpUser(name?.value, surname?.value, date?.value, user?.value, psw?.value)
        .pipe(
          catchError(error => {
              if(error.status === this.apiService.statusWrongEmail){
                this.errorReg = true;
                user?.patchValue(null);
                psw?.patchValue(null);
                confirmPsw?.patchValue(null);
              }
              return throwError(() => new Error('Email already in use!'));
          })
        )
        .subscribe(res => {
          console.log("Status --> " + res.status);
          if(res.status === this.apiService.statusRegOk){
            //signIn
            this.authService.signInUser(user?.value, psw?.value).subscribe(res => {
              if(res.status === this.apiService.statusOk){
                if(res.body !== null){
                  this.authService.setToken(res.body.token);
                  this.authService.setColor();
                  this.authService.setUserID(res.body.user_id);
                }
                this.navService.goToPage('/home');
              }
            });
          }
        });
        
      }
    }
  }

  ngOnInit(): void {
    this.maxDate = this.datePipe.transform(this.today, 'yyyy-MM-dd');
  }

}