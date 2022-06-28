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
  { path: '', pathMatch: 'full', redirectTo: 'login'}, 
  { path: '', canActivate:[AuthGuard], children: [
    { path: 'home', component: HomeComponent },
    { path: 'log/:machineID', component: LogComponent },
    { path: 'charts/:machineID', component: ChartsComponent },
    { path: 'machinePage/:machineID', component: MachineComponent },
    { path: 'userPage', component: UserComponent },
    { path: 'statistics', component: StatisticsComponent }
  ]},
  { path: '', canActivate:[LogoutGuard], children: [
    { path: 'login', component: LoginComponent }, 
    { path: 'registration', component: RegistrationComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
