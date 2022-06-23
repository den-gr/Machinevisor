import { Injectable } from '@angular/core';
import * as moment from "moment";
import { NavigationService } from '../navigationService/navigation.service';
import { APIService } from '../APIService/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private navService: NavigationService, private apiService: APIService) { }

  login(email:string, password:string){
    this.signUpUser(email, password);
  }

  private setSession(token: string) {
    //const expiresAt = moment().add(authResult.expiresIn,'second');

    localStorage.setItem('id_token', token);
    //localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }

  public logout() {
    this.navService.goToPage('/login');

    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    if(expiration != null){
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
    }
    return moment(JSON.parse('0'));
  } 

  public isTokenStored(){
    return localStorage.getItem("id_token") !== null;
  }

  private signUpUser(email: string, password: string){
    const url = "auth/sign_in";
    
    const data = {
      "email": email,
      "password": password
    };

    console.log(data)
    
    this.apiService.login(url, data).subscribe(res => {
      if(res.body != null){
        console.log(res.body.token)
        const token = res.body.token;
        console.log(token)
        this.setSession(token);
      }
    });
  }
}
