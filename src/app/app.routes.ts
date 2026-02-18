import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';  // Should point to src/app/login/login.component.ts
import { CalendarCalculatorComponent } from './calendar-calculator/calendar-calculator.component';  // Should point to src/app/calendar-calculator/calendar-calculator.component.ts

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: CalendarCalculatorComponent },
  { path: '**', redirectTo: '/login' }
];