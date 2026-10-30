import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { CreaComponent } from './crea.component';
import { TimesPipe } from '../times.pipe';

describe('CreaComponent', () => {
  let component: CreaComponent;
  let fixture: ComponentFixture<CreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, CreaComponent, TimesPipe],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('restores clan disciplines when resetting numeric clan ids', () => {
    component.clanPG?.setValue(3);
    component.changeclan();

    expect(component.discipline.map(discipline => discipline.iddisciplina)).toEqual([1, 8, 17]);

    component.discipline.forEach(discipline => discipline.livello = 1);
    component.resetdiscipline();

    expect(component.discipline.map(discipline => discipline.iddisciplina)).toEqual([1, 8, 17]);
    expect(component.discipline.map(discipline => discipline.livello)).toEqual([0, 0, 0]);
  });

  it('applies status limits when the selected id is numeric', () => {
    component.statusPG?.setValue(2);
    component.changestatus();

    expect(component.maxBG).toBe(8);
    expect(component.numDisc).toBe(6);
  });

  it('allows negative merit/flaw balance but requires focus and chronicle', () => {
    component.listaDisciplineVie = [{ disc_vie: 'D', id: 1, nome: 'Animalita', focus: 0 }];
    component.setFocusItem(0);
    component.cronacaOK = true;
    component.valorePregioDifetto = -1;

    expect(component.isFinalCheckValid()).toBe(true);

    component.valorePregioDifetto = 1;
    expect(component.isFinalCheckValid()).toBe(false);

    component.valorePregioDifetto = -1;
    component.cronacaOK = false;
    expect(component.isFinalCheckValid()).toBe(false);

    component.cronacaOK = true;
    component.setFocusItem(-1);
    expect(component.isFinalCheckValid()).toBe(false);
  });

  it('starts without a chronicle and accepts only one from the available list', () => {
    expect(component.cronacaPG).toBe(0);
    expect(component.cronacaOK).toBe(false);

    component.listacronache = [{ idcronaca: 7, descrizione: 'Test' }];
    component.onCronacaChange(0);
    expect(component.cronacaOK).toBe(false);

    component.onCronacaChange(8);
    expect(component.cronacaOK).toBe(false);

    component.onCronacaChange(7);
    expect(component.cronacaOK).toBe(true);
    expect(component.cronacaPG).toBe(7);

    component.resetFinalChoices();
    expect(component.cronacaPG).toBe(0);
    expect(component.cronacaOK).toBe(false);
  });
});
