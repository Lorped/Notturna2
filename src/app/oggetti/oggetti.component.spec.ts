import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OggettiComponent } from './oggetti.component';

describe('OggettiComponent', () => {
  let component: OggettiComponent;
  let fixture: ComponentFixture<OggettiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OggettiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OggettiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
