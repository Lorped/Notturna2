import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminbgComponent } from './adminbg.component';

describe('AdminbgComponent', () => {
  let component: AdminbgComponent;
  let fixture: ComponentFixture<AdminbgComponent>;

  beforeEach(waitForAsync(() => {
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
