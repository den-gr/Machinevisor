import { Injectable } from '@angular/core';
import { NavigationService } from '../navigationService/navigation.service';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

export interface Login{
  headers: string,
  status: number,
  statusText:string,
  url: string,
  ok: boolean,
  type: number,
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private navService: NavigationService, private http: HttpClient) { }

  private token = '';

  public getToken(){
    return this.token;
  }

  public login(email:string, password:string){
    this.signUpUser(email, password);
  }

  private setSession(token: string) {
    this.token = token;
  }

  public logout() {
    this.navService.goToPage('/login');

    this.token = '';
  }

  public isTokenStored(){
    return this.token !== '';
  }

  private signUpUser(email: string, password: string){    
    const data = {
      "email": email,
      "password": password
    };

    console.log(data)

    const url = environment.apiUrl + "auth/sign_in";
    return this.http.post<Login>(url, data, { observe: 'response' }).subscribe(res => {
      if(res.body != null){
        console.log(res.body.token)
        const token = res.body.token;
        console.log(token)
        this.setSession(token);
      }
    });
  }
}
