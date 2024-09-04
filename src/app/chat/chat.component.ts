import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

import { Chatrow, MyChat , ChatService , AdminService } from '../_services/index';
import { GlobalStatus } from '../global';

import { timer, Observable, Subscription } from 'rxjs';


export interface unPg {
  idutente: number;
  nomepg: string;
  tipo: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  statuschat = 0 ;

  killTrigger = true;

  mytimer = new  Subscription();
  statusText = '';

  chat: Array<Chatrow> = [];

  msg =  new UntypedFormControl('', [] ) ;
  selectedPG = '';
  listapg: Array<unPg> = [];


  constructor( private adminservice: AdminService , private globalstatus: GlobalStatus, private chatservice: ChatService ) { }

  ngOnInit(): void {

    this.adminservice.getpersonaggio().subscribe(
      (data: any) => {
        this.listapg = data.pg;
      }
    );

    this.globalstatus.Last = 0;

    this.mytimer = timer(0,20000).pipe(
      // This kills the request if the user closes the component
      // takeUntil(this.killTrigger),
      // switchMap cancels the last request, if no response have been received since last tick

    ).subscribe(
      (val) => {
        this.chatservice.getchat().subscribe(
          (data: MyChat) => {
            // console.log( "Mychat");
            // console.log(data);

            this.dostuffwithdata(data);

          }
        );
      }
    );
  }

  ngOnDestroy() {
    this.mytimer.unsubscribe();
  }

  dostuffwithdata(data: MyChat) {
    // console.log(data);
    this.statuschat = Number (data.Statuschat);
    this.globalstatus.Last = Number ( data.Last );


    if (this.statuschat === 0)  {
      this.globalstatus.Last = 0;
    } else {
      // console.log(data.Listachat);
      for ( let j = 0 ; j < data.Listachat.length ; j ++ ) {

        if ( ! isNaN(Number(data.Listachat[j].Destinatario)) ) {
          data.Listachat[j].Destinatario = '';
        }
        this.chat.splice(0, 0, data.Listachat[j]);

      }
      // console.log(this.chat);

    }
  }

  sendmsg() {
    this.chatservice.master2user(this.selectedPG, this.msg.value).subscribe(
      (data: any) => {
        this.msg.setValue( '' );
        this.msg!.markAsPristine();
        this.msg!.markAsUntouched();

        this.chatservice.getchat().subscribe(
          (data: MyChat) => {
            this.dostuffwithdata(data);
          }
        );
      }
    );
  }

  alea(){
    this.chatservice.lanciadado().subscribe(
      (data: any) => {
        this.chatservice.getchat().subscribe(
          (data: MyChat) => {
            this.dostuffwithdata(data);
          }
        );
      }
    );
  }

}
