import { Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { AdminService } from '../_services/index';
import { FullOggetto, Cronaca } from '../global';

export interface RigaPrestampa {
  IDoggetto: number;
  IDcronaca: number;
  nomeoggetto: string;
  selezionato: boolean;
  quantita: number;
}

@Component({
  selector: 'prestampa',
  styleUrl: './prestampa.component.css',
  templateUrl: './prestampa.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class PrestampaComponent implements OnInit {

  listacronache: Array<Cronaca> = [];
  selectedCronache: number[] = [];

  righe: Array<RigaPrestampa> = [];
  displayedRighe: Array<RigaPrestampa> = [];

  tuttiSelezionati = false;

  constructor(private adminservice: AdminService) { }

  ngOnInit(): void {
    this.adminservice.getlistcronache().subscribe(
      (data: any) => {
        this.listacronache = data;
      }
    );

    this.adminservice.listoggetti().subscribe(
      (data: any) => {
        this.righe = (data.oggetti as Array<FullOggetto>).map(oggetto => ({
          IDoggetto: oggetto.oggetto.idoggetto,
          IDcronaca: oggetto.oggetto.IDcronaca,
          nomeoggetto: oggetto.oggetto.nomeoggetto,
          selezionato: false,
          quantita: 1
        }));
        this.applyFiltro();
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
      (response: any) => {
        console.log('Risposta dal server:', response);
        window.open( 'https://www.roma-by-night.it/Notturna2/wsPHP/stampaoggetti.php', '_blank');
      },
      (error: any) => {
        console.error('Errore durante la stampa:', error);
      }
    );
    
  }

}
