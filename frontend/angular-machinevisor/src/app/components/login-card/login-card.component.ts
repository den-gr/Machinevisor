import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of, throwError } from 'rxjs';
import { APIService } from 'src/app/utilities/services/APIService/api.service';
import { AuthService } from 'src/app/utilities/services/authService/auth.service';
import { NavigationService } from 'src/app/utilities/services/navigationService/navigation.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss']
})
export class LoginCardComponent implements OnInit {

  constructor(private authService: AuthService, private navService: NavigationService, private apiService: APIService) { }

  myGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  errorLogin = false;

  onSubmit(){
    const user = this.myGroup.get('email')?.value;
    const psw = this.myGroup.get('password')?.value

    if(user !== '' &&  psw !== ''){ 
      this.authService.signInUser(user, psw)
      .pipe(
        catchError(error => {
            if(error.status === this.apiService.statusUnauthorized){
              this.errorLogin = true;
              this.myGroup.get('password')?.patchValue(null);
            }
            //return throwError(() => new Error('Wrong credentials!'));
            return of(error)
        })
      )
      .subscribe(res => {
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
  }

  ngOnInit(): void {
  }

}
