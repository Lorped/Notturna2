import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OggettiComponent } from './oggetti.component';

describe('OggettiComponent', () => {
  let component: OggettiComponent;
  let fixture: ComponentFixture<OggettiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ OggettiComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OggettiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
