import { Component, OnInit } from '@angular/core';
import { SchedaService } from '../services/index';
import { Pregio } from '../global';

@Component({
  selector: 'app-pregidifetti',
  templateUrl: './pregidifetti.component.html',
  styleUrls: ['./pregidifetti.component.css']
})
export class PregidifettiComponent implements OnInit {

  okPX = false;

  pxdisponibili = 0 ;

  saldo = 0 ;

  pregi_f: Array<Pregio> = [];
  pregi_m: Array<Pregio> = [];
  pregi_s: Array<Pregio> = [];
  pregi_x: Array<Pregio> = [];
  difetti_f: Array<Pregio> = [];
  difetti_m: Array<Pregio> = [];
  difetti_s: Array<Pregio> = [];
  difetti_x: Array<Pregio> = [];

  idutente = 0 ;

  pregi: Array<Pregio> = [];
  difetti: Array<Pregio> = [];

  ok_d_f = 0;
  ok_d_m = 0;
  ok_d_s = 0;
  ok_d_x = 0;

  ok_p_f = 0;
  ok_p_m = 0;
  ok_p_s = 0;
  ok_p_x = 0;


  new_d_f = '';
  new_d_m = '';
  new_d_s = '';
  new_d_x = '';

  new_p_f = '';
  new_p_m = '';
  new_p_s = '';
  new_p_x = '';

  constructor( private schedaservice: SchedaService ) { }

  ngOnInit(): void {
    this.idutente = Number( sessionStorage.getItem('NotturnaUser') );

    this.getliste ();
    this.getpregi ();
    this.getpx ();

  }


  getliste() {
    this.schedaservice.getpregidifetti(this.idutente)
    .subscribe(
      (data: any) => {
        this.pregi_f = data.pregi_f ;
        this.pregi_m = data.pregi_m ;
        this.pregi_s = data.pregi_s ;
        this.pregi_x = data.pregi_x ;

        this.difetti_f = data.difetti_f ;
        this.difetti_m = data.difetti_m ;
        this.difetti_s = data.difetti_s ;
        this.difetti_x = data.difetti_x ;

      }
    );
  }

  getpregi() {
    this.schedaservice.getpregi(this.idutente)
    .subscribe(
      (data: any) => {
        this.pregi = data.pregi ;
        this.difetti = data.difetti ;


        this.ok_d_f = 0;
        this.ok_d_m = 0;
        this.ok_d_s = 0;
        this.ok_d_x = 0;

        this.ok_p_f = 0;
        this.ok_p_m = 0;
        this.ok_p_s = 0;
        this.ok_p_x = 0;

        this.saldo = 0 ;

        for ( let item of this.difetti) {
          this.saldo += Number(item.valore);
          switch (item.classe) {
            case 'F':
              this.ok_d_f ++ ;
              break;
            case 'M':
              this.ok_d_m ++ ;
              break;
            case 'S':
              this.ok_d_s ++ ;
              break;
            case 'X':
              this.ok_d_x ++ ;
              break;
          }
        }

        for ( let item of this.pregi ) {
          item.valore = Number(item.valore);
          this.saldo =  this.saldo + item.valore - item.pxspesi / 2 ;
          switch (item.classe) {
            case 'F':
              this.ok_p_f ++ ;
              break;
            case 'M':
              this.ok_p_m ++ ;
              break;
            case 'S':
              this.ok_p_s ++ ;
              break;
            case 'X':
              this.ok_p_x ++ ;
              break;
          }
        }


      }
    );
  }

  newpregio(tipo: string) {
    let idpregio = '';

    switch (tipo) {
      case 'df':
        idpregio = this.new_d_f;
        break;
      case 'ds':
        idpregio = this.new_d_s;
        break;
      case 'dm':
        idpregio = this.new_d_m;
        break;
      case 'dx':
        idpregio = this.new_d_x;
        break;

      case 'pf':
        idpregio = this.new_p_f;
        break;
      case 'pm':
        idpregio = this.new_p_m;
        break;
      case 'ps':
        idpregio = this.new_p_s;
        break;
      case 'px':
        idpregio = this.new_p_x;
        break;
    }

    this.schedaservice.addpregio(this.idutente, idpregio)
    .subscribe(
      (data: any) => {

        this.new_d_f = '';
        this.new_d_m = '';
        this.new_d_s = '';
        this.new_d_x = '';

        this.new_p_f = '';
        this.new_p_m = '';
        this.new_p_s = '';
        this.new_p_x = '';
        this.getpregi();
        this.getliste();
        this.getpx();

      }
    );

  }

  abilitaPX() {
    this.okPX = !(this.okPX) ;
  }

  getpx() {
    this.schedaservice.getpx ( this.idutente)
    .subscribe(
      (data: any) => {
        this.pxdisponibili = data.pxdisponibili;
      }
    );
  }

}
