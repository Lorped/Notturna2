import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
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

  listapg: unPg[] = [];
  listacronache: Cronaca[] = [];
  selectedPG = 0;
  cronacaprincipale = 0;


  chanceMform = new UntypedFormGroup ({
    chance: new UntypedFormControl('', [
      Validators.required,
      Validators.max(99),
      Validators.min(1),
    ]),
  });

  actual = '0' ;

  private adminservice = inject(AdminService);
  private globalstatus = inject(GlobalStatus);

  


  ngOnInit(): void {



    // console.log(this.globalstatus);
    if (this.globalstatus.lastpg != 0 ){
      this.selectedPG =  this.globalstatus.lastpg;
    }
    if (this.globalstatus.cronacaprincipale != 0 ){
      this.cronacaprincipale =  this.globalstatus.cronacaprincipale;
    }

    this.adminservice.getlistcronache<Cronaca[]>().subscribe(
      (data: Cronaca[]) => {
        this.listacronache = data;
      }
    );

    this.aggiornaPersonaggi();

    this.adminservice.getchance<string>().subscribe({
      next: (data: string) => {
        this.actual = data;
        /* this.chanceMform.patchValue({chance:  this.actual });  */
      }
    });

  }

  get chance(){
    return this.chanceMform.get('chance');
  }

  aggiornaPersonaggi(): void {
    this.adminservice.getpersonaggio<{ pg: unPg[] }>(Number(this.cronacaprincipale || 0)).subscribe({
      next: (data) => {
        this.listapg = data.pg;
      }
    });
  }

  aggiornaSelected(): void {
    this.globalstatus.lastpg = Number(this.selectedPG || 0);
  }

  cambiachance(){
    const newc = Number(this.chanceMform.get('chance')!.value);
    this.adminservice.putchance<string>(newc).subscribe({
      next: () => {
        this.actual = String(this.chanceMform.get('chance')!.value ?? '0');
        /*this.chanceMform.patchValue({chance:  this.actual }); */
        this.chanceMform.reset();
      }
    });
  }

}
