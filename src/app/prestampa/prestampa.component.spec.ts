import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrestampaComponent } from './prestampa.component';

describe('PrestampaComponent', () => {
  let component: PrestampaComponent;
  let fixture: ComponentFixture<PrestampaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrestampaComponent]
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
