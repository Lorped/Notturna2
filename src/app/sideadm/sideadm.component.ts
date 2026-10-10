import { Component, OnInit, inject } from '@angular/core';
import {GlobalStatus} from '../global';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-sideadm',
    templateUrl: './sideadm.component.html',
    styleUrls: ['./sideadm.component.css'],
    imports: [RouterLink, MatCardModule]
})
export class SideadmComponent implements OnInit {

  selectedPG = 0;

  private globalstatus = inject(GlobalStatus);



  ngOnInit(): void {
    this.selectedPG = this.globalstatus.lastpg;
  }

}
