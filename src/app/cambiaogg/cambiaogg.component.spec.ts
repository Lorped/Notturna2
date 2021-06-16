import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CambiaoggComponent } from './cambiaogg.component';

describe('CambiaoggComponent', () => {
  let component: CambiaoggComponent;
  let fixture: ComponentFixture<CambiaoggComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CambiaoggComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CambiaoggComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
