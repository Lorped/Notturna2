import { Component, OnInit } from '@angular/core';
import { SchedaService } from '../services/index';
import { Background, Contatti } from '../global';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements OnInit {

  idutente = 0 ;

  fama1 = 0 ;
  fama2 = 0 ;
  fama3 = 0 ;

  listabg: Array<Background> = [];
  listaContatti: Array<Contatti> = [];
  sommacontatti = 0;

  myContatto = new FormControl ( '', [
    Validators.required,
    Validators.pattern(/.*[^ ].*/),
  ]);

  constructor( private schedaservice: SchedaService) { }

  ngOnInit(): void {
    this.idutente = Number( sessionStorage.getItem('NotturnaUser') );

    this.schedaservice.getfama(this.idutente).subscribe(
      (data: any) => {
        this.fama1 = Number (data.fama1);
        this.fama2 = Number (data.fama2);
        this.fama3 = Number (data.fama3);
      }
    );

    this.schedaservice.getbg(this.idutente).subscribe(
      (data: any) => {
        this.listabg = data.background;

        for ( let j=0 ; j< this.listabg.length ; j++) {
          this.listabg[j].livello = Number (this.listabg[j].livello);
        }

      }
    );

    this.schedaservice.getcontatti(this.idutente).subscribe(
      (data: any) => {
        this.listaContatti = data.contatti;

        this.sommacontatti = 0;
        for ( let j=0 ; j< this.listaContatti.length ; j++) {
          this.listaContatti[j].livello = Number (this.listaContatti[j].livello);
          this.sommacontatti += this.listaContatti[j].livello;
        }

      }
    );


  }

  addfama (ix:number) {
    switch (ix) {
      case 1:
        this.fama1++;
        break;
      case 2:
        this.fama2++;
        break;
      case 3:
        this.fama3++;
        break;
    }

    this.schedaservice.putfama ( this.idutente, this.fama1, this.fama2, this.fama3)
    .subscribe();
  }
  minfama (ix:number) {
    switch (ix) {
      case 1:
        this.fama1--;
        break;
      case 2:
        this.fama2--;
        break;
      case 3:
        this.fama3--;
        break;
    }

    this.schedaservice.putfama ( this.idutente, this.fama1, this.fama2, this.fama3)
    .subscribe();
  }

  minbg(id: number){
    let newlivello = 0 ;
    for ( let j = 0 ; j < this.listabg.length ; j++ ){
      if ( this.listabg[j].idback == id){
        this.listabg[j].livello -- ;
        newlivello = this.listabg[j].livello;
      }
    }
    this.schedaservice.putbg(this.idutente, id , newlivello )
    .subscribe();
  }

  addbg(id: number){
    let newlivello = 0 ;
    for ( let j = 0 ; j < this.listabg.length ; j++ ){
      if ( this.listabg[j].idback == id){
        this.listabg[j].livello ++ ;
        newlivello = this.listabg[j].livello;
      }
    }
    this.schedaservice.putbg(this.idutente, id , newlivello )
    .subscribe();
  }

  mincon(id:number){
    for ( let j=0 ; j< this.listaContatti.length ; j++) {
      if ( this.listaContatti[j].idcontatto == id ) {
        this.listaContatti[j].livello -- ;
        if (this.listaContatti[j].livello==0){
          this.listaContatti.splice(j, 1);
          console.log (this.listaContatti);
        }
        this.sommacontatti -- ;
      }
    }

  }
  addcon(id:number){
    for ( let j=0 ; j< this.listaContatti.length ; j++) {
      if ( this.listaContatti[j].idcontatto == id ) {
        this.listaContatti[j].livello ++ ;
        this.sommacontatti ++ ;
      }
    }
  }

  newcontatto(){
    let myNew = new Contatti;
    myNew.nomecontatto = this.myContatto.value;
    myNew.livello = 1 ;

    /* devo prendere l'ID contatto dopo il write */

    this.listaContatti.push( myNew);
    this.myContatto.reset();
  }


}
