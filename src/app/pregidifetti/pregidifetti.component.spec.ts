import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregidifettiComponent } from './pregidifetti.component';

describe('PregidifettiComponent', () => {
  let component: PregidifettiComponent;
  let fixture: ComponentFixture<PregidifettiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PregidifettiComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PregidifettiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
