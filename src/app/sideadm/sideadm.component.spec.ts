import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideadmComponent } from './sideadm.component';

describe('SideadmComponent', () => {
  let component: SideadmComponent;
  let fixture: ComponentFixture<SideadmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SideadmComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideadmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
