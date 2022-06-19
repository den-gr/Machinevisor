import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from "moment";
import { environment } from 'src/environments/environment';
import * as crypto from 'crypto-js';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,private router: Router) { }

  login(email:string, password:string){
    let salt = '1234567899WebApp' //chiamata API
    let hashedPsw = crypto.PBKDF2(password, salt, {
      keySize: 128 / 32
    });
    //this.signUpUser(email, hashedPsw.toString()); //questa ha http --> da cambiare!!
    const token = '0123456789';
    this.setSession(token)
  }

  private setSession(authResult: any) {
    const expiresAt = moment().add(authResult.expiresIn,'second');

        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }

  public logout() {
    this.router.navigate(["/login"]);

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
    const url = `${environment.apiUrl}/auth/sign_in`;
    const data = {
      "username": email,
      "password": password
    };
    console.log(data);
    //user: homerthebest
    //psw: admin
    this.http.post(url, data,
    { observe: 'response' }).subscribe(responce => {
      if(responce.status){
        console.log("SI");
      }else{
        console.log("NO");
      }
    });
  }
}
