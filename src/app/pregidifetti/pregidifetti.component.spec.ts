import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PregidifettiComponent } from './pregidifetti.component';

describe('PregidifettiComponent', () => {
  let component: PregidifettiComponent;
  let fixture: ComponentFixture<PregidifettiComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PregidifettiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PregidifettiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
