import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
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

  constructor(private globalstatus: GlobalStatus) { }

  ngOnInit(): void {
    this.selectedPG = this.globalstatus.lastpg;
  }

}
