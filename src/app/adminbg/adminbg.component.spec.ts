import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminbgComponent } from './adminbg.component';

describe('AdminbgComponent', () => {
  let component: AdminbgComponent;
  let fixture: ComponentFixture<AdminbgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminbgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminbgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
