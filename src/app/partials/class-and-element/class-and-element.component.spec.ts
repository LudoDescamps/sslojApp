import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassAndElementComponent } from './class-and-element.component';

describe('ClassAndElementComponent', () => {
  let component: ClassAndElementComponent;
  let fixture: ComponentFixture<ClassAndElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassAndElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassAndElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
