import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { PersonaggioComponent } from './personaggio.component';
import { TimesPipe } from '../times.pipe';
import { NonecrotaumPipe } from '../nonecrotaum.pipe';

describe('PersonaggioComponent', () => {
  let component: PersonaggioComponent;
  let fixture: ComponentFixture<PersonaggioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonaggioComponent, TimesPipe, NonecrotaumPipe ],
      providers: [provideRouter([])],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonaggioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
