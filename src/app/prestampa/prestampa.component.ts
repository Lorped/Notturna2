import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SideadmComponent } from '../sideadm/sideadm.component';
import { inject } from '@angular/core';
import { AdminService, RigaPrestampa } from '../_services/index';
import { Cronaca } from '../global';
import type { GetListOggetti } from '../_services/admin.service';




@Component({
  selector: 'app-prestampa',
  styleUrl: './prestampa.component.css',
  imports: [FormsModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSidenavModule, MatToolbarModule, SideadmComponent],
  templateUrl: './prestampa.component.html',
})
export class PrestampaComponent implements OnInit {

  listacronache: Cronaca[] = [];
  selectedCronache: number[] = [];

  righe: RigaPrestampa[] = [];
  displayedRighe: RigaPrestampa[] = [];

  tuttiSelezionati = false;

  public adminservice = inject(AdminService);
  private cdr = inject(ChangeDetectorRef);


  ngOnInit(): void {
    this.adminservice.getlistcronache<Cronaca[]>().subscribe(
      (data: Cronaca[]) => {
        this.listacronache = data;
        this.cdr.markForCheck();
      }
    );

    this.adminservice.listoggetti<GetListOggetti>().subscribe(
      (data: GetListOggetti) => {
        this.righe = data.oggetti.map(oggetto => ({
          IDoggetto: oggetto.oggetto.idoggetto,
          IDcronaca: oggetto.oggetto.IDcronaca,
          nomeoggetto: oggetto.oggetto.nomeoggetto,
          selezionato: false,
          quantita: 1
        }));
        this.applyFiltro();
        this.cdr.markForCheck();
      }
    );
  }

  filterByCronaca(idcronaca: number): void {
    idcronaca = Number(idcronaca);
    const index = this.selectedCronache.indexOf(idcronaca);

    if (index >= 0) {
      this.selectedCronache.splice(index, 1);
    } else {
      this.selectedCronache.push(idcronaca);
    }

    this.applyFiltro();
  }

  private applyFiltro(): void {
    if (!this.selectedCronache.length) {
      this.displayedRighe = [...this.righe];
    } else {
      this.displayedRighe = this.righe.filter(riga => this.selectedCronache.includes(Number(riga.IDcronaca ?? 0)));
    }

    // deseleziona le righe escluse dal filtro, cosi' non restano selezionate "nascoste"
    this.righe.filter(riga => !this.displayedRighe.includes(riga)).forEach(riga => riga.selezionato = false);

    this.aggiornaTuttiSelezionati();
  }

  toggleSelezionaTutti(): void {
    this.tuttiSelezionati = !this.tuttiSelezionati;
    this.displayedRighe.forEach(riga => riga.selezionato = this.tuttiSelezionati);
  }

  aggiornaTuttiSelezionati(): void {
    this.tuttiSelezionati = this.displayedRighe.length > 0 && this.displayedRighe.every(riga => riga.selezionato);
  }

  get almenoUnoSelezionato(): boolean {
    return this.displayedRighe.some(riga => riga.selezionato);
  }

  get selezionatiValidi(): boolean {
    const selezionati = this.displayedRighe.filter(riga => riga.selezionato);
    let validi = true;
    for (const sel of selezionati) {
      if (sel.quantita !== Number(sel.quantita)) {
        validi = false;
        break;
      }
    }
    return validi;
  }

  stampa(): void {
    const oggettiSelezionati = this.displayedRighe.filter(riga => riga.selezionato);
    console.log('Oggetti selezionati per la stampa:', oggettiSelezionati);
    this.adminservice.prestampa(oggettiSelezionati).subscribe(
      () => {
        //console.log('Risposta dal server:', response);
        window.open( 'https://www.roma-by-night.it/Notturna2/wsPHP/stampaoggetti.php', '_blank');
      },
      (error) => {
        console.error('Errore durante la stampa:', error);
      }
    );
    
  }

}
