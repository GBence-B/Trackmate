import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorComponent } from '../calculator/calculator.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface CalendarDay {
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  note: string;
}

@Component({
  selector: 'app-calendar-calculator',
  standalone: true,
  imports: [CommonModule, CalculatorComponent, FormsModule],
  templateUrl: './calendar-calculator.component.html',
  styleUrls: ['./calendar-calculator.component.css']
})
export class CalendarCalculatorComponent implements OnInit {
  calendarDays: CalendarDay[] = [];
  currentMonth: Date = new Date();

  constructor(private router: Router) {}

  ngOnInit() {
    this.generateCalendar();
  }

  generateCalendar() {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const numDays = lastDay.getDate();

    this.calendarDays = [];
    for (let i = 1; i <= numDays; i++) {
      const date = new Date(year, month, i);
      this.calendarDays.push({
        date: i,
        isCurrentMonth: true,
        isToday: date.toDateString() === new Date().toDateString(),
        note: ''
      });
    }
  }

  changeMonth(offset: number) {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + offset, 1);
    this.generateCalendar();
  }

  logout() {
    this.router.navigate(['/login']);
  }
}