import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { LogpxadmComponent } from './logpxadm.component';

describe('LogpxadmComponent', () => {
  let component: LogpxadmComponent;
  let fixture: ComponentFixture<LogpxadmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogpxadmComponent],
      providers: [provideRouter([])],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogpxadmComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
