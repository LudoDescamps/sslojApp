import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthorisedUSerComponent } from './unauthorised-user.component';

describe('UnauthorisedUSerComponent', () => {
  let component: UnauthorisedUSerComponent;
  let fixture: ComponentFixture<UnauthorisedUSerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnauthorisedUSerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnauthorisedUSerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
