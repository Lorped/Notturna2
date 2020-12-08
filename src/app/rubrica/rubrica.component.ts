import { Component, OnInit } from '@angular/core';
import { RubricaService } from '../_services/index';
import { Rubricaitem } from '../global';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rubrica',
  templateUrl: './rubrica.component.html',
  styleUrls: ['./rubrica.component.css']
})
export class RubricaComponent implements OnInit {

  idutente = 0 ;
  myrubrica: Array<Rubricaitem> = [];
  inedit = false ;
  toedit_nome  = '';
  toedit_note  = '';


  newcontatto = new FormControl ( '', [
    Validators.required,
    Validators.pattern(/.*[^ ].*/),
  ]);
  newcontatto2 = new FormControl ( '', [

  ]);

  constructor( private rubricaservice: RubricaService) { }

  ngOnInit(): void {

    this.idutente = Number( sessionStorage.getItem('NotturnaUser') );

    this.rubricaservice.getrubrica(this.idutente).
    subscribe (
      (data: any)  => {
        this.myrubrica = data;

        for (let i = 0 ; i < this.myrubrica.length ; i++) {
          this.myrubrica[i].cell = Number (this.myrubrica[i].cell);
          this.myrubrica[i].email = Number (this.myrubrica[i].email);
          this.myrubrica[i].home = Number (this.myrubrica[i].home);
        }
        // console.log(this.myrubrica);
      }
    );

  }

  togglecell(idrubrica:number) {
    for (let i = 0 ; i < this.myrubrica.length ; i++) {
      if ( this.myrubrica[i].idrubrica == idrubrica) {
        this.myrubrica[i].cell = ( this.myrubrica[i].cell==0 ? 1 : 0 );

        this.rubricaservice.changerubrica(this.myrubrica[i].idrubrica, this.myrubrica[i].contatto, this.myrubrica[i].cell,
            this.myrubrica[i].email, this.myrubrica[i].home, this.myrubrica[i].note).
            subscribe();
      }
    }

  }
  toggleemail(idrubrica:number) {
    for (let i = 0 ; i < this.myrubrica.length ; i++) {
      if ( this.myrubrica[i].idrubrica == idrubrica) {
        this.myrubrica[i].email = ( this.myrubrica[i].email==0 ? 1 : 0 );

        this.rubricaservice.changerubrica(this.myrubrica[i].idrubrica, this.myrubrica[i].contatto, this.myrubrica[i].cell,
            this.myrubrica[i].email, this.myrubrica[i].home, this.myrubrica[i].note).
            subscribe();
      }
    }
  }
  togglehome(idrubrica:number) {
    for (let i = 0 ; i < this.myrubrica.length ; i++) {
      if ( this.myrubrica[i].idrubrica == idrubrica) {
        this.myrubrica[i].home = ( this.myrubrica[i].home==0 ? 1 : 0 );

        this.rubricaservice.changerubrica(this.myrubrica[i].idrubrica, this.myrubrica[i].contatto, this.myrubrica[i].cell,
            this.myrubrica[i].email, this.myrubrica[i].home, this.myrubrica[i].note).
            subscribe();
      }
    }
  }
  del(idrubrica:number) {
    this.rubricaservice.delrubrica(idrubrica)
    .subscribe(
      data => {
        for (let i = 0 ; i < this.myrubrica.length ; i++) {
          if ( this.myrubrica[i].idrubrica == idrubrica) {
            this.myrubrica.splice(i, 1);
          }
        }
      }
    );
  }

  /*
  edit(idrubrica:number) {
    this.inedit = true;
    for (let i = 0 ; i < this.myrubrica.length ; i++) {
      if ( this.myrubrica[i].idrubrica == idrubrica) {
        this.toedit_nome = this.myrubrica[i].contatto;
        this.toedit_note = this.myrubrica[i].note;
      }
    }
  }
  */

  addcontatto() {
    let nomecontatto = this.newcontatto.value;
    let nomecontatto2 = this.newcontatto2.value;

    this.rubricaservice.addrubrica(this.idutente , nomecontatto, 0, 0, 0 , nomecontatto2)
    .subscribe (
      (data: Rubricaitem) => {
        this.myrubrica.push(data);
        this.newcontatto.reset();
        this.newcontatto2.reset();
      }
    );
  }

}
