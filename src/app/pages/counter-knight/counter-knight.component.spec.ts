import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterKnightComponent } from './counter-knight.component';

describe('CounterKnightComponent', () => {
  let component: CounterKnightComponent;
  let fixture: ComponentFixture<CounterKnightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounterKnightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterKnightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
