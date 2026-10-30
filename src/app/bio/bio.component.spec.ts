import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { BioComponent } from './bio.component';

describe('BioComponent', () => {
  let component: BioComponent;
  let fixture: ComponentFixture<BioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ BioComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
