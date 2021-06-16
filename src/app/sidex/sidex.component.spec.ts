import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SidexComponent } from './sidex.component';

describe('SidexComponent', () => {
  let component: SidexComponent;
  let fixture: ComponentFixture<SidexComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SidexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
