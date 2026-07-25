import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AdminService } from '../_services';
import { GlobalStatus, Cronaca } from '../global';


export interface FullEV {
  idutente: string;
  nomeplayer: string;
  nomepg: string;
  email: string;
  eventi: number;
  xp: number;
  eventodata: string;
  saldo: boolean;
  IDcronaca: number;
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

  listacronache: Array<Cronaca> = [];

  fulleventi: Array<FullEV> = [];
  displayedEventi: Array<FullEV> = [];
  currentSortColumn: keyof FullEV | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';
  selectedCronache: number[] = [];

  constructor(private adminservice: AdminService, private globalstatus: GlobalStatus) { }

  ngOnInit(): void {

    this.adminservice.getlistcronache().subscribe(
      (data: any) => {
        this.listacronache = data;
      }
    );

    this.adminservice.getfulleventi()
    .subscribe( 
      (data: any) => {
        this.fulleventi = data;
        this.fulleventi.forEach(element => {
          element.saldo = ( element.saldo.toString() == "1" )
          element.eventi = Number(element.eventi);
          element.xp = Number(element.xp);
        });
        this.displayedEventi = [...this.fulleventi];
        this.applySorting();
        // console.log ( this.fulleventi);
      }
    )

    //console.log ( this.selectedCronache);
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

  private getVisibleEventi(): FullEV[] {
    if (!this.selectedCronache.length) {
      return [...this.fulleventi];
    }

    return this.fulleventi.filter(evento => this.selectedCronache.includes(evento.IDcronaca));
  }

  filterByCronaca(idcronaca: number): void {
    const index = this.selectedCronache.indexOf(idcronaca);

    if (index >= 0) {
      this.selectedCronache.splice(index, 1);
    } else {
      this.selectedCronache.push(idcronaca);
    }

    this.applySorting();
  }

  private applySorting(): void {
    const source = this.getVisibleEventi();

    if (!this.currentSortColumn) {
      this.displayedEventi = [...source];
      return;
    }

    this.displayedEventi = [...source].sort((a, b) => {
      const valueA = a[this.currentSortColumn!];
      const valueB = b[this.currentSortColumn!];

      //console.log(`Sorting by ${this.currentSortColumn}:`, valueA, valueB);
      //console.log(`Sort direction: ${this.sortDirection}`);
      //console.log(`Type of valueA: ${typeof valueA}, Type of valueB: ${typeof valueB}`);

      if (typeof valueA === 'boolean' && typeof valueB === 'boolean') {
        return this.sortDirection === 'asc'
          ? Number(valueA) - Number(valueB)
          : Number(valueB) - Number(valueA);
      }

      if (typeof valueA === 'number' && typeof valueB === 'number') {
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
