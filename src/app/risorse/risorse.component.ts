import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthenticationService } from '../_services/index';
import { SchedaService, AdminService } from '../_services/index';
import { Background, Contatti, Skill, Sentiero, Pregio , GlobalStatus } from '../global';
import { Observable, of } from 'rxjs';


export class listaspese {
  public data = '' ;
  public spesa = 0 ;
  public cadenza = 30 ;
  public recuperati = 0 ;
};


@Component({
  selector: 'app-risorse',
  templateUrl: './risorse.component.html',
  styleUrls: ['./risorse.component.css']
})


export class RisorseComponent implements OnInit {

  idutente = 0 ;
  nomepg = '';

  listabg: Array<Background> = [];

  risorse_base = 0;

  saldo = 0 ;

  listaarray: Array <listaspese> = [];


  RisorseForm = new FormGroup ({
      spesa: new FormControl(0, [
        Validators.required,
        Validators.min(1)
      ],[
        this.validateRisorse.bind(this)
      ]),
  
      recupero: new FormControl(30, [
        Validators.required,
        Validators.min(1)
      ])

    });
  
  


  constructor(private globalstatus: GlobalStatus, private adminservice: AdminService, private schedaservice: SchedaService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idutente = Number ( this.route.snapshot.paramMap.get('id') );
    this.globalstatus.lastpg = this.idutente;

    this.adminservice.getnome(this.idutente).subscribe(
      (data: any) => {
        this.nomepg = data;
      }
    );



    this.schedaservice.getbg(this.idutente).subscribe(
      (data: any) => {
        this.listabg = data.background;

        for ( const item of this.listabg) {
          item.livello = Number (item.livello);
          item.idback = Number (item.idback);
          if (item.idback == 2) {
            this.risorse_base = item.livello;
          }
        }

        
      }
    );

    this.schedaservice.getrisorse(this.idutente).subscribe(
      (data: any) => {
        this.saldo = Number(data.saldo);

        this.listaarray = data.lista;

        //console.log(this.listaarray);
      }
    );


  

  }



  minbg(id: number){
    let newlivello = 0 ;

    this.risorse_base --;
    newlivello = this.risorse_base;


    this.schedaservice.putbg(this.idutente, id, newlivello, 'A' ).subscribe();
  }

  addbg(id: number){
    let newlivello = 0 ;

    this.risorse_base ++;
    newlivello = this.risorse_base;
    this.schedaservice.putbg(this.idutente, id , newlivello, 'A' ).subscribe();
  }

  addspesa(){
    console.log("here");
    console.log ("spesa "+this.spesa!.value);
    console.log ("recupero "+this.recupero!.value);





    this.schedaservice.addspesa(this.idutente, this.spesa!.value, this.recupero!.value).subscribe(
      data => {

        this.RisorseForm.reset();

        this.schedaservice.getrisorse(this.idutente).subscribe(
          (data: any) => {
            this.saldo = Number(data.saldo);
    
            this.listaarray = data.lista;
    
            //console.log(this.listaarray);
          });

      }
    );


    
  }

  get spesa() {
    return this.RisorseForm.get('spesa');
  }
  get recupero() {
    return this.RisorseForm.get('recupero');
  }


  validateRisorse (control: AbstractControl) : Observable<any> {
    
    const esito = (this.RisorseForm == undefined) || (Number(this.spesa!.value) >  this.risorse_base + this.saldo ) || Number(this.spesa!.value) <1 ?  { notok: true }: null;

    console.log(esito);
     
    //const esito = null;
    //console.log("here");
    return of(esito);
  }

}
