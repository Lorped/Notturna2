import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogpxComponent } from './logpx.component';

describe('LogpxComponent', () => {
  let component: LogpxComponent;
  let fixture: ComponentFixture<LogpxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ LogpxComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogpxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
