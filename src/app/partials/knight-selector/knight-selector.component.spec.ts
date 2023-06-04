import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnightSelectorComponent } from './knight-selector.component';

describe('KnightSelectorComponent', () => {
  let component: KnightSelectorComponent;
  let fixture: ComponentFixture<KnightSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KnightSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KnightSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
