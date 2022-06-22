import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private openMenu = false;

  constructor() { }

  public getMenuState(){
    return this.openMenu;
  }

  public clickMenu() {
    console.log("CLICK MENU");
    this.openMenu = !this.openMenu;
  }
  
  public close(){
    this.openMenu = false
    console.log("CHIUSO")
  }
}
