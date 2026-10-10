import { Component, OnInit, OnDestroy, inject, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SideadmComponent } from '../sideadm/sideadm.component';
import { UntypedFormControl } from '@angular/forms';

import { Chatrow, MyChat , ChatService , AdminService } from '../_services/index';
import { GlobalStatus } from '../global';

import { timer,  Subscription } from 'rxjs';


export interface unPg {
  idutente: number;
  nomepg: string;
  tipo: string;
}

interface GetPersonaggio {
  pg: unPg[];
}

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css'],
    imports: [MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatSidenavModule, MatToolbarModule, ReactiveFormsModule, SideadmComponent],
})
export class ChatComponent implements OnInit, OnDestroy {

  statuschat = 0 ;

  killTrigger = true;

  mytimer = new  Subscription();
  statusText = '';

  chat: Chatrow[] = [];

  msg =  new UntypedFormControl('', [] ) ;
  selectedPG = '';
  listapg: unPg[] = [];

  private adminservice = inject(AdminService);
  private globalstatus = inject(GlobalStatus);
  private chatservice = inject(ChatService);
  private cdr = inject(ChangeDetectorRef);


  

  ngOnInit(): void {

    this.adminservice.getpersonaggio<GetPersonaggio>(this.globalstatus.cronacaprincipale).subscribe(
      (data: GetPersonaggio) => {
        this.listapg = data.pg;
        this.cdr.markForCheck();
      }
    );

    this.globalstatus.Last = 0;

    this.mytimer = timer(0,20000).pipe(
      // This kills the request if the user closes the component
      // takeUntil(this.killTrigger),
      // switchMap cancels the last request, if no response have been received since last tick

    ).subscribe(
      () => {
        this.chatservice.getchat<MyChat>().subscribe(
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
      for (const row of data.Listachat) {
        if (!isNaN(Number(row.Destinatario))) {
          row.Destinatario = '';
        }
        this.chat.splice(0, 0, row);
      }
      // console.log(this.chat);

    }
    this.cdr.markForCheck();
  }

  sendmsg() {
    this.chatservice.master2user(this.selectedPG, this.msg.value).subscribe(
      () => {
        this.msg.setValue( '' );
        this.msg!.markAsPristine();
        this.msg!.markAsUntouched();
        this.cdr.markForCheck();

        this.chatservice.getchat<MyChat>().subscribe(
          (data: MyChat) => {
            this.dostuffwithdata(data);
          }
        );
      }
    );
  }

  alea(){
    this.chatservice.lanciadado().subscribe(
      () => {
        this.chatservice.getchat<MyChat>().subscribe(
          (data: MyChat) => {
            this.dostuffwithdata(data);
          }
        );
      }
    );
  }

}
