import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from "moment";
import { NavigationService } from '../navigationService/navigation.service';
import { APIService } from '../APIService/api.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private navService: NavigationService, private apiService: APIService) { }

  login(email:string, password:string){
    this.signUpUser('homer@unibo.it', 'admin');
    const token = '0123456789';
    this.setSession(token)
  }

  private setSession(authResult: any) {
    const expiresAt = moment().add(authResult.expiresIn,'second');

        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
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
    return localStorage.getItem("id_token") != null;
  }

  private signUpUser(email: string, password: string){
    const url = "auth/sign_in";
    
    const data = {
      "email": email,
      "password": password
    };
    
    //esempio chiamata
    this.apiService.postAPI(url, data).subscribe(res => {
      console.log(JSON.stringify(res));
    });
  }
}
