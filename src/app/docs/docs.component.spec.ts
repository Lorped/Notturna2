import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { DocsComponent } from './docs.component';

describe('DocsComponent', () => {
  let component: DocsComponent;
  let fixture: ComponentFixture<DocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DocsComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
