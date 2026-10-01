import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrestampaComponent } from './prestampa.component';

describe('PrestampaComponent', () => {
  let component: PrestampaComponent;
  let fixture: ComponentFixture<PrestampaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrestampaComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PrestampaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
