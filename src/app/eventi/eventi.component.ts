import { Component, OnInit } from '@angular/core';
import { AdminService } from '../_services';


export interface FullEV {
  idutente: string;
  nomeplayer: string;
  nomepg: string;
  email: string;
  eventi: string;
  xp: string;
  eventodata: string;
  saldo: boolean;

}


@Component({
  selector: 'app-eventi',
  templateUrl: './eventi.component.html',
  styleUrls: ['./eventi.component.css']
})
export class EventiComponent implements OnInit {

  fulleventi: Array<FullEV> = [];

  constructor(private adminservice: AdminService) { }

  ngOnInit(): void {

    this.adminservice.getfulleventi()
    .subscribe( 
      (data: any) => {
        this.fulleventi = data;
        //console.log ( this.fulleventi);
      }
    )
  }

  checkpay (id:string) {
    console.log ( "on-off ", id);
    this.adminservice.cambiasaldo( Number(id) )
    .subscribe(
      (data:any) => {
        //console.log(data);
        this.fulleventi.filter(obj => obj.idutente == id)[0].saldo = data;
        //console.log (this.fulleventi.filter(obj => obj.idutente == id)[0] );
      }
    )
  }

}
