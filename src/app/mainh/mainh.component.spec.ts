import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainhComponent } from './mainh.component';

describe('MainhComponent', () => {
  let component: MainhComponent;
  let fixture: ComponentFixture<MainhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
