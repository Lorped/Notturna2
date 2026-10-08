import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { SchedaService } from '../_services/index';

interface BGClan {
  linkurl: string;
}

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

  private schedaservice = inject(SchedaService);



  ngOnInit(): void {
    const idutente = Number( sessionStorage.getItem('NotturnaUser') );
    this.schedaservice.getBGClan<BGClan>(idutente).subscribe(
      (data: BGClan) => {
        this.link = data.linkurl;
      }
    );
    this.schedaservice.getclan<number>(idutente).subscribe(
      (data: number) => {
        this.idclan = data;
        this.trem = (this.idclan === 7);
        this.giova = (this.idclan === 11);
      }
    );



  }

}
