import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SchedaService, AdminService } from '../_services/index';
import { Background, Contatti, Skill, Sentiero, Pregio , GlobalStatus } from '../global';

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


}
