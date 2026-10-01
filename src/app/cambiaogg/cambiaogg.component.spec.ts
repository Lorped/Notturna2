import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { CambiaoggComponent } from './cambiaogg.component';
import { AdminService } from '../_services';

describe('CambiaoggComponent', () => {
  let component: CambiaoggComponent;
  let fixture: ComponentFixture<CambiaoggComponent>;
  const previousHistoryState = window.history.state;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CambiaoggComponent ],
      providers: [
        provideRouter([]),
        {
          provide: AdminService,
          useValue: {
            getcondizioni: () => of({ skill: [], otherskill: [], poteri: [], attributi: [], discipline: [] }),
            getunpaired: () => of({ unpaired: [] })
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    window.history.replaceState({
      obj: {
        oggetto: { nomeoggetto: '', descrizione: '' },
        condizioni: [],
        condizioni2: [],
        paired: { idpaired: 0, nomepaired: '', descpaired: '' }
      }
    }, '');
    fixture = TestBed.createComponent(CambiaoggComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => window.history.replaceState(previousHistoryState, ''));
});
