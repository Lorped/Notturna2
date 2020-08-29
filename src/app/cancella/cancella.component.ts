import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SchedaService } from '../_services/index';

@Component({
  selector: 'app-cancella',
  templateUrl: './cancella.component.html',
  styleUrls: ['./cancella.component.css']
})
export class CancellaComponent implements OnInit {

  imfine = false ;
  constructor( private schedaservice: SchedaService, private router: Router) { }

  ngOnInit(): void {
  }

  ok() {
    this.imfine ? this.imfine = false : this.imfine = true ;
  }

  cancella() {
    const idutente = Number( sessionStorage.getItem('NotturnaUser') );
    this.schedaservice.cancellascheda(idutente).subscribe(
      (data: any) => {
        sessionStorage.setItem('NotturnaUser1', '0' );
        this.router.navigate(['/gate']);
      }
    );

  }

}
