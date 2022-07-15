import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIService } from '../APIService/api.service';
import { AuthService } from '../authService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private openMenu = false;

  constructor(private ApiService: APIService) { }

  public getMenuState(){
    return this.openMenu;
  }

  public clickMenu() {
    this.openMenu = !this.openMenu;
  }
  
  public close(){
    this.openMenu = false
  }
}
