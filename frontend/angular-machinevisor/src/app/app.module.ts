import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { MachineComponent } from './pages/machine/machine.component';
import { MachineInfoComponent } from './components/machine-info/machine-info.component';
import { OnOffButtonComponent } from './components/on-off-button/on-off-button.component';
import { MachineModesComponent } from './components/machine-modes/machine-modes.component';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MachinePeriodComponent } from './components/machine-period/machine-period.component';
import { MapCardComponent } from './components/map-card/map-card.component';
import { MapComponent } from './components/map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    MenuComponent,
    HomeComponent,
    MachineComponent,
    MachineInfoComponent,
    OnOffButtonComponent,
    MachineModesComponent,
    MachinePeriodComponent,
    MapCardComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'accent' },
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
