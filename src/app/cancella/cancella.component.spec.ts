import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancellaComponent } from './cancella.component';

describe('CancellaComponent', () => {
  let component: CancellaComponent;
  let fixture: ComponentFixture<CancellaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CancellaComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancellaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
