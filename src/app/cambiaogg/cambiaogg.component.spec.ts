import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiaoggComponent } from './cambiaogg.component';

describe('CambiaoggComponent', () => {
  let component: CambiaoggComponent;
  let fixture: ComponentFixture<CambiaoggComponent>;

  beforeEach(async(() => {
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
