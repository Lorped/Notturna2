import { Component, OnInit } from '@angular/core';
import { AdminService } from '../_services/index';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalStatus } from '../global';

export interface unPg {
  idutente: number;
  nomepg: string;
  tipo: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  listapg: Array<unPg> = [];
  selectedPG = '';


  chanceMform = new FormGroup ({
    chance: new FormControl('', [
      Validators.required,
      Validators.max(99),
      Validators.min(1),
    ]),
  });

  actual = '0' ;

  constructor(private globalstatus: GlobalStatus, private adminservice: AdminService) { }


  ngOnInit(): void {

    console.log(this.globalstatus);
    if (this.globalstatus.lastpg != 0 ){
      this.selectedPG = String( this.globalstatus.lastpg);
    }

    this.adminservice.getpersonaggio().subscribe(
      (data: any) => {
        this.listapg = data.pg;
      }
    );

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
