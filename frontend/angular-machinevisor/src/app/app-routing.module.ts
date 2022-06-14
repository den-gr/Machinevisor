import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartsComponent } from './pages/charts/charts.component';
import { HomeComponent } from './pages/home/home.component';
import { LogComponent } from './pages/log/log.component';
import { LoginComponent } from './pages/login/login.component';
import { MachineComponent } from './pages/machine/machine.component';
import { UserComponent } from './pages/user/user.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'log/:machineID', component: LogComponent },
  { path: 'charts/:machineID', component: ChartsComponent },
  { path: 'machinePage/:machineID', component: MachineComponent },
  { path: 'userPage/:userID', component: UserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
