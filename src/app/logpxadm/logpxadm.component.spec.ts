import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogpxadmComponent } from './logpxadm.component';

describe('LogpxadmComponent', () => {
  let component: LogpxadmComponent;
  let fixture: ComponentFixture<LogpxadmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogpxadmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogpxadmComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
