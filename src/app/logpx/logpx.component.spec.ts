import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LogpxComponent } from './logpx.component';

describe('LogpxComponent', () => {
  let component: LogpxComponent;
  let fixture: ComponentFixture<LogpxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LogpxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogpxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
