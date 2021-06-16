import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SpendipxComponent } from './spendipx.component';

describe('SpendipxComponent', () => {
  let component: SpendipxComponent;
  let fixture: ComponentFixture<SpendipxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SpendipxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpendipxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
