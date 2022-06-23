import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

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
export class APIService {

  constructor(private http: HttpClient) { }

  public getAPI(obj:string){
    const url = environment.apiUrl + obj;
    return this.http.get(url);
  }

  public postAPI(obj:string, arg:any){
    const url = environment.apiUrl + obj;
    return this.http.post(url, arg, { observe: 'response' });
  }

  public login(obj:string, arg:any){
    const url = environment.apiUrl + obj;
    return this.http.post<Login>(url, arg, { observe: 'response' });
  }
}
