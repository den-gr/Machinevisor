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

export interface Machine{
  machine_id: number,
  machine_name: string,
  weight: number,
  brand: string,
  production_year: string,
  last_revision: string,
  client_service_number: string,
  img_uri: string,
  modalities: string, //questo non va bene così
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

  public getMachineInfo(ID:string){
    const url = environment.apiUrl + 'machines/' + ID;
    return this.http.get<Machine>(url);
  }
}
