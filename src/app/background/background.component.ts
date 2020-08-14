import { Component, OnInit } from '@angular/core';
import { SchedaService } from '../services/index';
import { Background } from '../global';

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


}
