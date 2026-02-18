import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  isRegistering: boolean = false;
  errorMessage: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (this.isRegistering) {
      if (localStorage.getItem(this.username)) {
        this.errorMessage = 'Username already exists!';
      } else {
        localStorage.setItem(this.username, JSON.stringify({ password: this.password }));
        this.router.navigate(['/main']);
      }
    } else {
      const user = localStorage.getItem(this.username);
      if (user && JSON.parse(user).password === this.password) {
        this.router.navigate(['/main']);
      } else {
        this.errorMessage = 'Invalid credentials!';
      }
    }
  }

  toggleMode() {
    this.isRegistering = !this.isRegistering;
    this.errorMessage = '';
  }

  useAsGuest() {
    this.router.navigate(['/main']);
  }
}