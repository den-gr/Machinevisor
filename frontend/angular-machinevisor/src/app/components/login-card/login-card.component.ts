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
    console.log("LOGIN");
    const user = this.myGroup.get('email')?.value;
    const psw = this.myGroup.get('password')?.value

    if(user !== '' &&  psw !== ''){
      //CONTROLLO FINTO PER FARE DELLE PROVE! 
      if(user === "homer.simpson@gmail.com" && psw === "Admin0987654321"){ //togliere if
        this.authService.login(user, psw); //save token in storage
        this.navService.goToPage('/home')
      }else{
        this.errorLogin = true;
        this.myGroup.get('password')?.patchValue(null);
      }
    }
  }

  ngOnInit(): void {
  }

}
