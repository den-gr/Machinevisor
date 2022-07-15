import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ChartDefaultValues, ChartEntry, MachineChart } from '../../dataInterfaces/charts';
import { Log } from '../../dataInterfaces/log';
import { Machine, Machines } from '../../dataInterfaces/machine';
import { User } from '../../dataInterfaces/user';
import { AuthService } from '../authService/auth.service';

export interface BestWorst{
  best: string,
  worst: string
}

export interface MainValues{
    allarms: number,
    msgsForMinute: number,
    kWattAvg: number
}

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

  public getLogs(ID: number, limit: string){
    const url = environment.apiUrl + 'machines/' + ID.toString() + '/logs/' + limit;

    return this.http.get<Log[]>(url, this.makeHeader()).pipe(
      catchError(error => {
          return this.tokenError(error)
      })
    );
  }

  public getMainValuesOverview(){
    const url = environment.apiUrl + 'overview/mainValues';

    return this.http.get<MainValues>(url, this.makeHeader()).pipe(
      catchError(error => {
          return this.tokenError(error)
      })
    );
  }

  public getBestWorstMachine(){
    const url = environment.apiUrl + 'overview/bestAndWorst';

    return this.http.get<BestWorst>(url, this.makeHeader()).pipe(
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

  public getMachineCharts(ID:string){
    const url = environment.apiUrl + 'machines/' + ID + "/charts";
    return this.http.get<MachineChart[]>(url, this.makeHeader()).pipe(
      catchError(error => {
          return this.tokenError(error)
      })
    );
  }

  public getChartDefaultValues(){
    const url = environment.apiUrl + 'statistics/defaultValues';
    return this.http.get<ChartDefaultValues>(url, this.makeHeader()).pipe(
      catchError(error => {
          return this.tokenError(error)
      })
    );
  }

  public getChartMachineAllarms(){
    const url = environment.apiUrl + 'statistics/allarms';
    return this.http.get<ChartEntry[]>(url, this.makeHeader()).pipe(
      catchError(error => {
          return this.tokenError(error)
      })
    );
  }

  public getChartActiveTime(){
    const url = environment.apiUrl + 'statistics/activeTime';
    return this.http.get<ChartEntry[]>(url, this.makeHeader()).pipe(
      catchError(error => {
          return this.tokenError(error)
      })
    );

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
    //return throwError(() => new Error('Token expired!'));
    return of(error)
  }
}
