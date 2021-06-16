import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CancellaComponent } from './cancella.component';

describe('CancellaComponent', () => {
  let component: CancellaComponent;
  let fixture: ComponentFixture<CancellaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CancellaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancellaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
