import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

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

  myForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), PasswordValidator.strong]),
    confirmPassword: new FormControl('', [Validators.required])
  }, { validators: PasswordValidator.checkPasswords })

  matcher = new MyErrorStateMatcher();

  constructor(private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.maxDate = this.datePipe.transform(this.today, 'yyyy-MM-dd');
    console.log(this.maxDate)
  }

}