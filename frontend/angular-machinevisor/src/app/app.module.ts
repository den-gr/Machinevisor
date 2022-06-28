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
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { MachineComponent } from './pages/machine/machine.component';
import { MachineInfoComponent } from './components/machine-info/machine-info.component';
import { MachineModesComponent } from './components/machine-modes/machine-modes.component';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MachinePeriodComponent } from './components/machine-period/machine-period.component';
import { MapCardComponent } from './components/map-card/map-card.component';
import { MapComponent } from './components/map/map.component';
import { SwitchOffDialogComponent } from './components/switch-off-dialog/switch-off-dialog.component';
import { OverviewComponent } from './components/overview/overview.component';
import { UserComponent } from './pages/user/user.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { WeeklyScheduleComponent } from './components/weekly-schedule/weekly-schedule.component';
import { MachineMenuComponent } from './components/machine-menu/machine-menu.component';
import { LoginComponent } from './pages/login/login.component';
import { ChartsComponent } from './pages/charts/charts.component';
import { LogComponent } from './pages/log/log.component';
import { LoginCardComponent } from './components/login-card/login-card.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { RegistrationCardComponent } from './components/registration-card/registration-card.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { DatePipe } from '@angular/common';
import { ChartComponent } from './components/chart/chart.component';

import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    MenuComponent,
    HomeComponent,
    MachineComponent,
    MachineInfoComponent,
    MachineModesComponent,
    MachinePeriodComponent,
    MapCardComponent,
    MapComponent,
    SwitchOffDialogComponent,
    OverviewComponent,
    UserComponent,
    UserInfoComponent,
    WeeklyScheduleComponent,
    MachineMenuComponent,
    LoginComponent,
    ChartsComponent,
    LogComponent,
    LoginCardComponent,
    RegistrationComponent,
    RegistrationCardComponent,
    StatisticsComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    NgChartsModule
  ],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'accent' },
  }, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
