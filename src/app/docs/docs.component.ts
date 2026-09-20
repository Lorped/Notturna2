import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SchedaService } from '../_services/index';

@Component({
    selector: 'app-docs',
    templateUrl: './docs.component.html',
    styleUrls: ['./docs.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class DocsComponent implements OnInit {

  idclan = 0;

  link = '/docs/#';
  linkT = '/docs/#';
  linkN = '/docs/#';
  linkV = '/docs/#';

  disC = false ;

  trem = false;
  giova = false;



  constructor( private schedaservice: SchedaService ) { }

  ngOnInit(): void {
    const idutente = Number( sessionStorage.getItem('NotturnaUser') );
    this.schedaservice.getDT(idutente).subscribe(
      (data: any) => {
        this.link = data.linkurl;
      }
    );
    this.schedaservice.getclan(idutente).subscribe(
      (data: any) => {
        this.idclan = Number(data);
        this.trem = (this.idclan === 7);
        this.giova = (this.idclan === 11);
      }
    );



  }

}
