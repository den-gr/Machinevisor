import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) { }

  public goToPage(page: string){
    this.router.navigate([page]);
  }

  public goToParam(ID:any, child:string){
    if(child){
      this.router.navigate(['machine', ID.toString(), child]);
    }else{
      this.router.navigate(['machine', ID.toString()]);
    }    
  }

  public refreshPage(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }
}
