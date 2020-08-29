import { Component, OnInit } from '@angular/core';

import { Chatrow, MyChat , ChatService } from '../_services/index';
import { GlobalStatus } from '../global';

import { timer, Observable, Subscription } from 'rxjs';
import { switchMap, takeUntil, catchError } from 'rxjs/operators';

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


  constructor( private globalstatus: GlobalStatus, private chatservice: ChatService ) { }

  ngOnInit(): void {

    this.globalstatus.Last = 0;

    this.mytimer = timer(0,20000).pipe(
      // This kills the request if the user closes the component
      // takeUntil(this.killTrigger),
      // switchMap cancels the last request, if no response have been received since last tick

    ).subscribe(
      (val) => {
        this.chatservice.getchat().subscribe(
          (data: MyChat) => {
            console.log( "Mychat");
            console.log(data);

            this.dostuffwithdata(data);
            this.scrollToBottom();
          }
        );
      }
    );
  }

  ngOnDestroy() {
    this.mytimer.unsubscribe();
  }

  dostuffwithdata(data: MyChat) {
    console.log(data);
    this.statuschat = Number (data.Statuschat);
    this.globalstatus.Last = Number ( data.Last );

    if (this.statuschat === 0)  {
      this.globalstatus.Last = 0;
    } else {

      console.log(data.Listachat);
    }
  }

  scrollToBottom() {
    console.log("here");
  }

}
