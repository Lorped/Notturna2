import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
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
    imports: [MatToolbarModule, MatCardModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule, ReactiveFormsModule, RouterLink],
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
  private cdr = inject(ChangeDetectorRef);

  


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
        this.cdr.markForCheck();
      }
    );

    this.aggiornaPersonaggi();

    this.adminservice.getchance<string>().subscribe({
      next: (data: string) => {
        this.actual = data;
        this.cdr.markForCheck();
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
        this.cdr.markForCheck();
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
        this.cdr.markForCheck();
      }
    });
  }

}
