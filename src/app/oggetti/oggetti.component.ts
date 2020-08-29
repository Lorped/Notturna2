import { Component, OnInit } from '@angular/core';
import { AdminService } from '../_services/index';
import { Oggetto, Condizione, FullOggetto} from '../global';
import { Router, NavigationExtras } from '@angular/router';
/* import { FormControl, FormGroup, Validators } from '@angular/forms'; */



@Component({
  selector: 'app-oggetti',
  templateUrl: './oggetti.component.html',
  styleUrls: ['./oggetti.component.css']
})
export class OggettiComponent implements OnInit {


  nomeoggetto = '';
  descrizione = '';

  listaoggetti: Array<FullOggetto> = [];
  listafissomobile: { id: string, nome: string }[] = [
    {id: 'F', nome: 'Fisso'} ,
    {id: 'M', nome: 'Mobile'} ,
    {id: 'E', nome: 'Esterno'} ,
    {id: 'C', nome: 'Celato'} ,
    {id: 'U', nome: 'Utente'}
  ];
  fissomobile = 'F';

  constructor( private adminservice: AdminService, private router: Router) { }

  ngOnInit(): void {

    this.adminservice.listoggetti().subscribe(
      (data: any) => {
        this.listaoggetti = data.oggetti;
        // console.log(this.listaoggetti);
      }
    );
  }

  cancellaoggetto(idoggetto: number){
    this.adminservice.cancellaoggetto(idoggetto).subscribe(
      (data) => {
        for (let j = 0 ; j < this.listaoggetti.length ; j++) {
          if (this.listaoggetti[j].oggetto.idoggetto == idoggetto) {
            this.listaoggetti.splice(j,1);
          }
        }
      }
    );
  }

  aggiungioggetto(){
    this.adminservice.addoggetto( this.nomeoggetto , this.descrizione, this.fissomobile).subscribe(
      (data) => {
        this.adminservice.listoggetti().subscribe(
          (data: any) => {
            this.listaoggetti = data.oggetti;
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
