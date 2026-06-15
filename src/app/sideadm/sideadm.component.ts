import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-sideadm',
    templateUrl: './sideadm.component.html',
    styleUrls: ['./sideadm.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SideadmComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
