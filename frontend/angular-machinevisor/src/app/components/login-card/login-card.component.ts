import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/utilities/services/authService/auth.service';
import { NavigationService } from 'src/app/utilities/services/navigationService/navigation.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss']
})
export class LoginCardComponent implements OnInit {

  constructor(private authService: AuthService, private navService: NavigationService) { }

  myGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  errorLogin = false;

  onSubmit(){
    const user = this.myGroup.get('email')?.value;
    const psw = this.myGroup.get('password')?.value
    console.log(user + " | " + psw);

    if(user !== '' &&  psw !== ''){ 
      this.authService.signInUser(user, psw).subscribe(res => {
        console.log("mi sono autenticata? " + res.status);
        if(res.status === this.authService.getStatusOk()){
          if(res.body !== null){
            this.authService.setToken(res.body.token);
          }
          this.navService.goToPage('/home');
        }else{
          this.errorLogin = true;
          this.myGroup.get('password')?.patchValue(null);
        }
      });
    }
  }

  ngOnInit(): void {
  }

}
