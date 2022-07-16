import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartsComponent } from './pages/charts/charts.component';
import { HomeComponent } from './pages/home/home.component';
import { LogComponent } from './pages/log/log.component';
import { LoginComponent } from './pages/login/login.component';
import { MachineComponent } from './pages/machine/machine.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { UserComponent } from './pages/user/user.component';
import { AuthGuard } from './utilities/guard/authGuard/auth.guard';
import { LogoutGuard } from './utilities/guard/logoutGuard/logout.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'signIn'}, 
  { path: '', canActivate:[AuthGuard], children: [
    { path: 'home', component: HomeComponent },
    { path: 'machine/:machineID/logs', component: LogComponent },
    { path: 'machine/:machineID/charts', component: ChartsComponent },
    { path: 'machine/:machineID', component: MachineComponent },
    { path: 'user', component: UserComponent },
    { path: 'statistics', component: StatisticsComponent }
  ]},
  { path: '', canActivate:[LogoutGuard], children: [
    { path: 'signIn', component: LoginComponent }, 
    { path: 'signUp', component: RegistrationComponent },
  ]},
  {path: '**', redirectTo: 'signIn'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
