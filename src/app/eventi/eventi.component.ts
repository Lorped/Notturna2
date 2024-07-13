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
        // console.log ( this.fulleventi);
      }
    )
  }

}
