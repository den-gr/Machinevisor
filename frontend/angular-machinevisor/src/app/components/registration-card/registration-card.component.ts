import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';

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

  onSubmit(){
    console.log("REGISTRATION");
    const user = this.myForm.get('email');
    const name = this.myForm.get('name');
    const surname = this.myForm.get('surname');
    const date = this.myForm.get('date');
    const psw = this.myForm.get('password');
    const confirmPsw = this.myForm.get('confirmPassword');

    if(user?.value !== '' && name?.value !== '' && surname?.value !== '' && date?.value !== '' && psw?.value !== '' && confirmPsw?.value !== ''){
      //inserisco i dati nel DB
      if(user?.value === "prova.prova@prova.com"){ //togliere!!!
        //faccio il login con questo utente
        //redirect alla home
        this.router.navigate(["/home"]);
      }else{
        //se l'email già esiste
        this.errorReg = true;
        user?.patchValue(null);
        //name?.patchValue(null);
        //surname?.patchValue(null);
        //date?.patchValue(null);
        psw?.patchValue(null);
        confirmPsw?.patchValue(null);
      }
    }
  }

  constructor(private datePipe: DatePipe, private router: Router) { }

  ngOnInit(): void {
    this.maxDate = this.datePipe.transform(this.today, 'yyyy-MM-dd');
    console.log(this.maxDate)
  }

}