import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SideadmComponent } from '../sideadm/sideadm.component';
import { AdminService } from '../_services/index';
import { FullOggetto, GlobalStatus, Cronaca} from '../global';
import { Router, NavigationExtras } from '@angular/router';
import type { GetListOggetti } from '../_services/admin.service';



@Component({
    selector: 'app-oggetti',
    templateUrl: './oggetti.component.html',
    styleUrls: ['./oggetti.component.css'],
    imports: [FormsModule, MatButtonModule, MatCardModule, MatChipsModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatRadioModule, MatSidenavModule, MatToolbarModule, SideadmComponent],
})
export class OggettiComponent implements OnInit {


  nomeoggetto = '';
  descrizione = '';

  listacronache: Cronaca[] = [];
  selectedCronache: number[] = [];

  listaoggetti: FullOggetto[] = [];
  displayedOggetti: FullOggetto[] = [];
  listafissomobile: { id: string, nome: string }[] = [
    {id: 'F', nome: 'Fisso'} ,
    {id: 'M', nome: 'Mobile'} ,
    {id: 'E', nome: 'Esterno'} ,
    {id: 'C', nome: 'Celato'} ,
    {id: 'U', nome: 'Utente'}
  ];
  fissomobile = 'F';

  private adminservice = inject(AdminService);
  private router = inject(Router);
  public globalstatus = inject(GlobalStatus);
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
        this.listaoggetti = data.oggetti;



        this.sortListaOggetti();
        this.applyFiltro();
        this.cdr.markForCheck();
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
      () => {
        for (let j = 0 ; j < this.listaoggetti.length ; j++) {
          if (this.listaoggetti[j].oggetto.idoggetto == idoggetto) {
            this.listaoggetti.splice(j,1);
          }
        }
        this.applyFiltro();
        this.cdr.markForCheck();
      }
    );
  }

  aggiungioggetto(){
    this.adminservice.addoggetto( this.nomeoggetto , this.descrizione, this.fissomobile).subscribe(
      () => {
        this.adminservice.listoggetti<GetListOggetti>().subscribe(
          (data: GetListOggetti) => {
            this.listaoggetti = data.oggetti;
            this.sortListaOggetti();
            this.applyFiltro();
            this.nomeoggetto = '';
            this.descrizione = '';
            this.fissomobile = 'F';
            this.cdr.markForCheck();
          }
        );
      }
    );
  }

  stampa(){
    this.router.navigate(['/prestampa']);
    //window.open( 'https://www.roma-by-night.it/notturna/stampaoggetti.php', '_blank');
  }

  modifica(id: number, item: FullOggetto){
    // console.log (id);
    const navigationExtras: NavigationExtras = { state: { obj: item } };
    this.router.navigate(['/cambiaogg/'+id], navigationExtras );
  }

}
