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

  public async initMenuMachines(): Promise<Array<string>> {
    return new Promise((result) => {
      let tmpArray = Array<string>();
      this.ApiService.getMachinesList().subscribe(res => {
        res.forEach(machine => tmpArray.push(machine.machine_name));
        result(tmpArray);
      });
    });
  }

  public getMachines(){
    let array = Array()
    this.initMenuMachines().then(result => {
      array = result;
    });
    console.log("macchine --> " + array);
    return array;
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
