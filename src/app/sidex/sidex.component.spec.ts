import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidexComponent } from './sidex.component';

describe('SidexComponent', () => {
  let component: SidexComponent;
  let fixture: ComponentFixture<SidexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SidexComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
