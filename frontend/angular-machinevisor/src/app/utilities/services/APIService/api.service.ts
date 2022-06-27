import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../authService/auth.service';

export interface Machine{
  machine_id: number,
  machine_name: string,
  weight: number,
  brand: string,
  production_year: string,
  last_revision: string,
  client_service_number: string,
  img_uri: string,
  modalities: Array<String>,
}

export interface Machines{
  machine_id: number,
  machine_name: string,
}

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  /*public getAPI(obj:string){
    const url = environment.apiUrl + obj;
    return this.http.get(url);
  }

  public postAPI(obj:string, arg:any){
    const url = environment.apiUrl + obj;
    return this.http.post(url, arg, { observe: 'response' });
  }*/

  public getMachineInfo(ID:string){
    const url = environment.apiUrl + 'machines/' + ID;

    return this.http.get<Machine>(url, this.makeHeader());
  }

  public getMachinesList(){
    const url = environment.apiUrl + 'machines';

    return this.http.get<Machines[]>(url);
  }

  private makeHeader(){
    const header = {
      Authorization: `Bearer ${this.authService.getToken()}`
    }

    return {                                                                                                                                                                                 
      headers: new HttpHeaders(header), 
    };
  }
}
