import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SchedaComponent } from './scheda.component';
import { TimesPipe } from '../times.pipe';
import { NonecrotaumPipe } from '../nonecrotaum.pipe';

describe('SchedaComponent', () => {
  let component: SchedaComponent;
  let fixture: ComponentFixture<SchedaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedaComponent, TimesPipe, NonecrotaumPipe ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
