import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent} from './login/login.component';
import { DashboardComponent } from './dashbord/dashbord.component';

export const routes: Routes = [
  { path: 'Home', component: HomeComponent }, 
  { path: 'Login', component: LoginComponent }, 
  { path: 'Dashbord', component: DashboardComponent }, 
];
