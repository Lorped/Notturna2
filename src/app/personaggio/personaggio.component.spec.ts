import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PersonaggioComponent } from './personaggio.component';

describe('PersonaggioComponent', () => {
  let component: PersonaggioComponent;
  let fixture: ComponentFixture<PersonaggioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonaggioComponent ]
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
