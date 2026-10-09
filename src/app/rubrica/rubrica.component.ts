import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { RubricaService } from '../_services/index';
import { Rubricaitem } from '../global';
import { UntypedFormControl,  Validators } from '@angular/forms';

@Component({
    selector: 'app-rubrica',
    templateUrl: './rubrica.component.html',
    styleUrls: ['./rubrica.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class RubricaComponent implements OnInit {

  idutente = 0 ;
  myrubrica: Rubricaitem[] = [];
  inedit = false ;
  toedit_nome  = '';
  toedit_note  = '';


  newcontatto = new UntypedFormControl ( '', [
    Validators.required,
    Validators.pattern(/.*[^ ].*/),
  ]);
  newcontatto2 = new UntypedFormControl ( '', [

  ]);

  private rubricaservice = inject(RubricaService);


  ngOnInit(): void {

    this.idutente = Number( sessionStorage.getItem('NotturnaUser') );

    this.rubricaservice.getrubrica<Rubricaitem[]>(this.idutente).
    subscribe (
      (data: Rubricaitem[])  => {
        this.myrubrica = data;
        // console.log(this.myrubrica);
      }
    );

  }

  togglecell(idrubrica:number) {
    for (const item of this.myrubrica) {
      if ( item.idrubrica == idrubrica) {
        item.cell = ( item.cell==0 ? 1 : 0 );

        this.rubricaservice.changerubrica(item.idrubrica, item.contatto, item.cell,
            item.email, item.home, item.note).
            subscribe();
      }
    }

  }
  toggleemail(idrubrica:number) {
    for (const item of this.myrubrica) {
      if ( item.idrubrica == idrubrica) {
        item.email = ( item.email==0 ? 1 : 0 );

        this.rubricaservice.changerubrica(item.idrubrica, item.contatto, item.cell,
            item.email, item.home, item.note).
            subscribe();
      }
    }
  }
  togglehome(idrubrica:number) {
    for (const item of this.myrubrica) {
      if ( item.idrubrica == idrubrica) {
        item.home = ( item.home==0 ? 1 : 0 );

        this.rubricaservice.changerubrica(item.idrubrica, item.contatto, item.cell,
            item.email, item.home, item.note).
            subscribe();
      }
    }
  }
  del(idrubrica:number) {
    this.rubricaservice.delrubrica(idrubrica)
    .subscribe(
      () => {
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
    const nomecontatto = this.newcontatto.value;
    const nomecontatto2 = this.newcontatto2.value;

    this.rubricaservice.addrubrica<Rubricaitem>(this.idutente , nomecontatto, 0, 0, 0 , nomecontatto2)
    .subscribe (
      (data: Rubricaitem) => {
        this.myrubrica.push(data);
        this.newcontatto.reset();
        this.newcontatto2.reset();
      }
    );
  }

}
