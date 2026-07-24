import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AdminService } from '../_services/index';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { GlobalStatus, Cronaca } from '../global';

export interface unPg {
  idutente: number;
  nomepg: string;
  tipo: string;
}

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AdminComponent implements OnInit {

  listapg: Array<unPg> = [];
  listacronache: Array<Cronaca> = [];
  selectedPG = '';
  cronacaprincipale = '';


  chanceMform = new UntypedFormGroup ({
    chance: new UntypedFormControl('', [
      Validators.required,
      Validators.max(99),
      Validators.min(1),
    ]),
  });

  actual = '0' ;

  constructor(private globalstatus: GlobalStatus, private adminservice: AdminService) { }


  ngOnInit(): void {



    // console.log(this.globalstatus);
    if (this.globalstatus.lastpg != 0 ){
      this.selectedPG = String( this.globalstatus.lastpg);
    }
    if (this.globalstatus.cronacaprincipale != 0 ){
      this.cronacaprincipale = String( this.globalstatus.cronacaprincipale);
    }

    this.adminservice.getlistcronache().subscribe(
      (data: any) => {
        this.listacronache = data;
      }
    );

    this.aggiornaPersonaggi();

    this.adminservice.getchance().subscribe(
      (data: any) => {
        this.actual = data;
        /* this.chanceMform.patchValue({chance:  this.actual });  */
      }
    );

  }

  get chance(){
    return this.chanceMform.get('chance');
  }

  aggiornaPersonaggi(): void {
    this.adminservice.getpersonaggio(Number(this.cronacaprincipale || 0)).subscribe(
      (data: any) => {
        this.listapg = data.pg;
      }
    );
  }

  cambiachance(){
    let newc = Number ( this.chanceMform.get('chance')!.value );
    this.adminservice.putchance( newc ).subscribe(
      (data: any) => {
        this.actual = this.chanceMform.get('chance')!.value ;
        /*this.chanceMform.patchValue({chance:  this.actual }); */
        this.chanceMform.reset();
      }
    );
  }

}
