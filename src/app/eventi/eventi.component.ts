import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AdminService } from '../_services';


export interface FullEV {
  idutente: string;
  nomeplayer: string;
  nomepg: string;
  email: string;
  eventi: string;
  xp: string;
  eventodata: string;
  saldo: boolean;
  Cronaca: string;
}


@Component({
    selector: 'app-eventi',
    templateUrl: './eventi.component.html',
    styleUrls: ['./eventi.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class EventiComponent implements OnInit {

  fulleventi: Array<FullEV> = [];
  displayedEventi: Array<FullEV> = [];
  currentSortColumn: keyof FullEV | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private adminservice: AdminService) { }

  ngOnInit(): void {

    this.adminservice.getfulleventi()
    .subscribe( 
      (data: any) => {
        this.fulleventi = data;
        this.fulleventi.forEach(element => {
          element.saldo = ( element.saldo.toString() == "1" )
        });
        this.displayedEventi = [...this.fulleventi];
        this.applySorting();
        // console.log ( this.fulleventi);
      }
    )
  }

  sortBy(column: keyof FullEV): void {
    if (this.currentSortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentSortColumn = column;
      this.sortDirection = 'asc';
    }

    this.applySorting();
  }

  private applySorting(): void {
    if (!this.currentSortColumn) {
      this.displayedEventi = [...this.fulleventi];
      return;
    }

    this.displayedEventi = [...this.fulleventi].sort((a, b) => {
      const valueA = a[this.currentSortColumn!];
      const valueB = b[this.currentSortColumn!];

      if (typeof valueA === 'boolean' && typeof valueB === 'boolean') {
        return this.sortDirection === 'asc'
          ? Number(valueA) - Number(valueB)
          : Number(valueB) - Number(valueA);
      }

      const left = String(valueA).toLowerCase();
      const right = String(valueB).toLowerCase();

      if (left < right) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (left > right) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  checkpay (id:string) {
    console.log ( "on-off ", id);
    this.adminservice.cambiasaldo( Number(id) )
    .subscribe(
      (data:any) => {
        // console.log(data);
        this.fulleventi.filter(obj => obj.idutente == id)[0].saldo = (data == "1") ;
        //console.log (this.fulleventi.filter(obj => obj.idutente == id)[0] );
      }
    )
  }

}
