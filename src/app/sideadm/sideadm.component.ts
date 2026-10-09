import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import {GlobalStatus} from '../global';

@Component({
    selector: 'app-sideadm',
    templateUrl: './sideadm.component.html',
    styleUrls: ['./sideadm.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SideadmComponent implements OnInit {

  selectedPG = 0;

  private globalstatus = inject(GlobalStatus);



  ngOnInit(): void {
    this.selectedPG = this.globalstatus.lastpg;
  }

}
