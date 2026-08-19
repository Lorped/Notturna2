import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AdminService } from '../_services/index';
import { Oggetto, Condizione, FullOggetto, GlobalStatus, Cronaca} from '../global';
import { Router, NavigationExtras } from '@angular/router';
/* import { FormControl, FormGroup, Validators } from '@angular/forms'; */



@Component({
    selector: 'app-oggetti',
    templateUrl: './oggetti.component.html',
    styleUrls: ['./oggetti.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class OggettiComponent implements OnInit {


  nomeoggetto = '';
  descrizione = '';

  listacronache: Array<Cronaca> = [];
  selectedCronache: number[] = [];

  listaoggetti: Array<FullOggetto> = [];
  displayedOggetti: Array<FullOggetto> = [];
  listafissomobile: { id: string, nome: string }[] = [
    {id: 'F', nome: 'Fisso'} ,
    {id: 'M', nome: 'Mobile'} ,
    {id: 'E', nome: 'Esterno'} ,
    {id: 'C', nome: 'Celato'} ,
    {id: 'U', nome: 'Utente'}
  ];
  fissomobile = 'F';

  constructor( private adminservice: AdminService, private router: Router, public globalstatus: GlobalStatus) { }

  ngOnInit(): void {

    this.adminservice.getlistcronache().subscribe(
      (data: any) => {
        this.listacronache = data;
      }
    );

    this.adminservice.listoggetti().subscribe(
      (data: any) => {
        this.listaoggetti = data.oggetti;



        this.sortListaOggetti();
        this.applyFiltro();
        // console.log(this.listaoggetti);
      }
    );
  }

  private sortListaOggetti(): void {
    const cronacaCorrente = Number(this.globalstatus.cronacaprincipale ?? 0);

    this.listaoggetti.sort((a, b) => {
      const aPriorita = Number(a.oggetto.IDcronaca ?? 0) === cronacaCorrente ? 0 : 1;
      const bPriorita = Number(b.oggetto.IDcronaca ?? 0) === cronacaCorrente ? 0 : 1;
      return aPriorita - bPriorita;
    });
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
      this.displayedOggetti = [...this.listaoggetti];
      return;
    }

    this.displayedOggetti = this.listaoggetti.filter(item => this.selectedCronache.includes(Number(item.oggetto.IDcronaca ?? 0)));
  }

  puoGestireOggetto(item: FullOggetto): boolean {
    return Number(item?.oggetto?.IDcronaca ?? 0) === Number(this.globalstatus?.cronacaprincipale ?? 0);
  }

  cancellaoggetto(idoggetto: number){
    this.adminservice.cancellaoggetto(idoggetto).subscribe(
      (data) => {
        for (let j = 0 ; j < this.listaoggetti.length ; j++) {
          if (this.listaoggetti[j].oggetto.idoggetto == idoggetto) {
            this.listaoggetti.splice(j,1);
          }
        }
        this.applyFiltro();
      }
    );
  }

  aggiungioggetto(){
    this.adminservice.addoggetto( this.nomeoggetto , this.descrizione, this.fissomobile).subscribe(
      (data) => {
        this.adminservice.listoggetti().subscribe(
          (data: any) => {
            this.listaoggetti = data.oggetti;
            this.sortListaOggetti();
            this.applyFiltro();
            this.nomeoggetto = '';
            this.descrizione = '';
            this.fissomobile = 'F';
          }
        );
      }
    );
  }

  stampa(){
    window.open( 'https://www.roma-by-night.it/notturna/stampaoggetti.php', '_blank');
  }

  modifica(id: number, item: FullOggetto){
    // console.log (id);
    const navigationExtras: NavigationExtras = { state: { obj: item } };
    this.router.navigate(['/cambiaogg/'+id], navigationExtras );
  }

}
