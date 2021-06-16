import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SideadmComponent } from './sideadm.component';

describe('SideadmComponent', () => {
  let component: SideadmComponent;
  let fixture: ComponentFixture<SideadmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SideadmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideadmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
