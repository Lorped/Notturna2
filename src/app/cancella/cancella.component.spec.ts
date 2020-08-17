import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancellaComponent } from './cancella.component';

describe('CancellaComponent', () => {
  let component: CancellaComponent;
  let fixture: ComponentFixture<CancellaComponent>;

  beforeEach(async(() => {
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
