import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome';
import { LoginComponent } from './login/login';
import { CalendarCalculatorComponent } from './calendar-calculator/calendar-calculator';
import { DashboardComponent } from './dashboard/dashboard';


export const routes: Routes = [
    { path: '', component: WelcomeComponent },
    { path: 'login', component: LoginComponent },
{ path: 'main', component: CalendarCalculatorComponent },
    { path: 'admin', component: DashboardComponent },
    { path: '**', component: WelcomeComponent }

];
