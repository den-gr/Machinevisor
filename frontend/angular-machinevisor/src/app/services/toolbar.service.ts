import { Injectable } from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  constructor() { }

  private sidenav!: MatDrawer;//! ???

  public setSidenav(sidenav: MatDrawer) {
    this.sidenav = sidenav;
  }

  public open() {
    this.sidenav.opened = true; //<--
    return this.sidenav.open();
  }

  public close() {
    console.log('close')
    return this.sidenav.close();
  }

  public toggle() {
    return this.sidenav.toggle();
  }
}
