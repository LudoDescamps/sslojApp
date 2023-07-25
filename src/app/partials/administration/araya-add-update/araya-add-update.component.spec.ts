import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArayaAddUpdateComponent } from './araya-add-update.component';

describe('ArayaAddUpdateComponent', () => {
  let component: ArayaAddUpdateComponent;
  let fixture: ComponentFixture<ArayaAddUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArayaAddUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArayaAddUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
