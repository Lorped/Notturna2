import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpoteriComponent } from './addpoteri.component';

describe('AddpoteriComponent', () => {
  let component: AddpoteriComponent;
  let fixture: ComponentFixture<AddpoteriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddpoteriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpoteriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
