import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreaComponent } from './crea.component';

describe('CreaComponent', () => {
  let component: CreaComponent;
  let fixture: ComponentFixture<CreaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
