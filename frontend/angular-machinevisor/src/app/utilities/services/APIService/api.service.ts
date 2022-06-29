import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Machine, Machines } from '../../dataInterfaces/machine';
import { User } from '../../dataInterfaces/user';
import { AuthService } from '../authService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  statusOk = 200;
  statusRegOk = 201;
  statusWrongEmail = 409;
  statusUnauthorized = 401;

  public getMachineInfo(ID:string){
    const url = environment.apiUrl + 'machines/' + ID;

    return this.http.get<Machine>(url, this.makeHeader()).pipe(
      catchError(error => {
          return this.tokenError(error)
      })
    );
  }

  public getMachinesList(){
    const url = environment.apiUrl + 'machines';

    return this.http.get<Machines[]>(url);
  }

  public getUser(){
    const url = environment.apiUrl + 'users/' + this.authService.getUserID();

    return this.http.get<User>(url, this.makeHeader()).pipe(
      catchError(error => {
          return this.tokenError(error)
      })
    );
  }

  public signUpUser(name:string, surname:string, bDate:string, email:string, password:string){
    const data = {
      "name": name,
      "surname": surname,
      "birth_date": bDate,
      "email": email,
      "password": password
    }

    const url = environment.apiUrl + "auth/sign_up";
    return this.http.post(url, data, { observe: 'response' });
  }

  private makeHeader(){
    const header = {
      Authorization: `Bearer ${this.authService.getToken()}`
    }

    return {                                                                                                                                                                                 
      headers: new HttpHeaders(header), 
    };
  }

  private tokenError(error: any){
    if(error.status === this.statusUnauthorized){
      this.authService.logout();
    }
    return throwError(() => new Error('Token expired!'));
  }
}
