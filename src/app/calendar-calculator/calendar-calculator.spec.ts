import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarCalculator } from './calendar-calculator';

describe('CalendarCalculator', () => {
  let component: CalendarCalculator;
  let fixture: ComponentFixture<CalendarCalculator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarCalculator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarCalculator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
