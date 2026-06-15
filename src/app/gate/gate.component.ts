import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-gate',
    templateUrl: './gate.component.html',
    styleUrls: ['./gate.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class GateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
