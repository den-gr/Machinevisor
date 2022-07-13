import { Injectable } from '@angular/core';
import { NavigationService } from '../navigationService/navigation.service';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Login } from '../../dataInterfaces/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  colors = ['red', 'orange', 'green', 'blue', 'purple', 'pink']

  constructor(private navService: NavigationService, private http: HttpClient) { }

  private getRandColor(){
    const max = this.colors.length -1
    const min = 0
    const rand =  Math.floor(Math.random() * (max - min + 1)) + min;
    return this.colors[rand];
  }

  public setColor(){
    localStorage.setItem('userColor', this.getRandColor())
  }

  public getUserColor(){
    return localStorage.getItem('userColor');
  }

  public getToken(){
    return localStorage.getItem('token');
  }

  public setToken(token: string){
    localStorage.setItem('token', token);
  }

  public setUserID(ID: number){
    localStorage.setItem('userID', ID.toString());
  }

  public getUserID(){
    return localStorage.getItem('userID');
  }

  public logout() {
    this.navService.goToPage('/login');

   localStorage.removeItem('token');
   localStorage.removeItem('userColor');
  }

  public isTokenStored(){
    return this.getToken() !== null;
  }

  public signInUser(email: string, password: string){    
    const data = {
      "email": email,
      "password": password
    };

    console.log(data)

    const url = environment.apiUrl + "auth/sign_in";
    return this.http.post<Login>(url, data, { observe: 'response' })
  }
}
