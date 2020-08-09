import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogpxComponent } from './logpx.component';

describe('LogpxComponent', () => {
  let component: LogpxComponent;
  let fixture: ComponentFixture<LogpxComponent>;

  beforeEach(async(() => {
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
