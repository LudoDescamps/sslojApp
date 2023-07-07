import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnightAddUpdateComponent } from './knight-add-update.component';

describe('KnightAddUpdateComponent', () => {
  let component: KnightAddUpdateComponent;
  let fixture: ComponentFixture<KnightAddUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KnightAddUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KnightAddUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
