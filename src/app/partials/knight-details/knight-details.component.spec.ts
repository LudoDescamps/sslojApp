import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnightDetailsComponent } from './knight-details.component';

describe('KnightDetailsComponent', () => {
  let component: KnightDetailsComponent;
  let fixture: ComponentFixture<KnightDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KnightDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KnightDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
