import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

interface ExpenseCategory {
  name: string;
  items: number[];
  newAmount: number;
  subtotal: number;
}

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('300ms ease-in')
      ]),
      transition('* => void', [
        animate('300ms ease-out', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ]),
    trigger('buttonHover', [
      state('idle', style({ transform: 'scale(1)', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' })),
      state('hover', style({ transform: 'scale(1.05)', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' })),
      transition('idle <=> hover', animate('200ms ease-in-out'))
    ]),
    trigger('slideInOut', [
      state('in', style({ height: '*', opacity: 1 })),
      transition('void => *', [
        style({ height: 0, opacity: 0 }),
        animate('300ms ease-in')
      ]),
      transition('* => void', [
        animate('300ms ease-out', style({ height: 0, opacity: 0 }))
      ])
    ])
  ]
})
export class CalculatorComponent {
  display: string = '';
  rawValue: number | null = null;
  selectedCurrency: string = 'USD';
  expensesVisible: boolean = false;

  expenseCategories: ExpenseCategory[] = [
    { name: 'Groceries', items: [], newAmount: 0, subtotal: 0 },
    { name: 'Rent', items: [], newAmount: 0, subtotal: 0 },
    { name: 'Utilities', items: [], newAmount: 0, subtotal: 0 },
    { name: 'Hobbies', items: [], newAmount: 0, subtotal: 0 }
  ];

  get grandTotal(): number {
    return this.expenseCategories.reduce((total, cat) => total + cat.subtotal, 0);
  }

  get formattedDisplay(): string {
    if (this.rawValue !== null) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: this.selectedCurrency
      }).format(this.rawValue);
    }
    return '';
  }

  formattedCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: this.selectedCurrency
    }).format(amount);
  }

  append(value: string) {
    this.display += value;
    this.rawValue = null;
  }

  clear() {
    this.display = '';
    this.rawValue = null;
  }

  calculate() {
    try {
      this.rawValue = eval(this.display) as number;
    } catch {
      this.rawValue = null;
      this.display = 'Error';
    }
  }

  onKeyPress(event: KeyboardEvent) {
    const key = event.key;
    if (key >= '0' && key <= '9' || key === '+' || key === '-' || key === '*' || key === '/') {
      this.append(key);
    } else if (key === 'Enter') {
      this.calculate();
      event.preventDefault();
    } else if (key === 'Backspace') {
      this.display = this.display.slice(0, -1);
      this.rawValue = null;
    } else if ((event.ctrlKey || event.metaKey) && key === 'c') {
      this.clear();
    }
    event.preventDefault();
  }

  updateDisplay() {}

  toggleExpenses() {
    this.expensesVisible = !this.expensesVisible;
  }

  addExpense(category: ExpenseCategory) {
    if (category.newAmount > 0) {
      category.items.push(category.newAmount);
      category.subtotal += category.newAmount;
      category.newAmount = 0;
    }
  }

  removeExpense(category: ExpenseCategory, index: number) {
    category.subtotal -= category.items[index];
    category.items.splice(index, 1);
  }

  confirmClear() {
    if (confirm('Are you sure you want to clear all expenses?')) {
      this.clearAllExpenses();
    }
  }

  clearAllExpenses() {
    this.expenseCategories.forEach(cat => {
      cat.items = [];
      cat.subtotal = 0;
      cat.newAmount = 0;
    });
  }
}