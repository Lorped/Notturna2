import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SideadmComponent } from '../sideadm/sideadm.component';
import { TimesPipe } from '../times.pipe';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { SchedaService, AdminService } from '../_services/index';
import { Background,  GlobalStatus, listaspese } from '../global';
import { GetScheda, GetBG, GetRisorse } from '../_services/scheda.service';
import { Observable, of } from 'rxjs';






@Component({
    selector: 'app-risorse',
    templateUrl: './risorse.component.html',
    styleUrls: ['./risorse.component.css'],
    imports: [MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSidenavModule, MatToolbarModule, ReactiveFormsModule, SideadmComponent, TimesPipe],
})


export class RisorseComponent implements OnInit {

  idutente = 0 ;
  nomepg = '';

  listabg: Background[] = [];

  risorse_base = 0;

  saldo = 0 ;

  listaarray: listaspese[] = [];


  RisorseForm = new FormGroup ({
      spesa: new FormControl(0, [
        Validators.required,
        Validators.min(1)
      ],[
        this.validateRisorse.bind(this)
      ]),
  
      recupero: new FormControl(30, [
        Validators.required,
        Validators.min(1)
      ])

    });
  
    contanti = 0;
  
    private adminservice = inject(AdminService);
    private schedaservice = inject(SchedaService);
    private globalstatus = inject(GlobalStatus);
    private route = inject(ActivatedRoute);
    private cdr = inject(ChangeDetectorRef);


  ngOnInit(): void {
    this.idutente = Number ( this.route.snapshot.paramMap.get('id') );
    this.globalstatus.lastpg = this.idutente;
    

    this.adminservice.getnome<string>(this.idutente).subscribe(
      (data: string) => {
        this.nomepg = data;
        this.cdr.markForCheck();
      }
    );

    this.schedaservice.getscheda<GetScheda>(this.idutente).subscribe (
      (data: GetScheda) => {
        //console.log(data);
        this.contanti = data.user.contanti;
        this.cdr.markForCheck();
      }
    );

    this.schedaservice.getbg<GetBG>(this.idutente).subscribe(
      (data: GetBG) => {
        this.listabg = data.background;
        for ( const item of this.listabg) {
          if (item.idback == 2) {
            this.risorse_base = item.livello;
          }
        }       
        this.cdr.markForCheck();
      }
    );

    this.schedaservice.getrisorse<GetRisorse>(this.idutente).subscribe(
      (data: GetRisorse) => {
        this.saldo = data.saldo;
        this.listaarray = data.lista;
        this.cdr.markForCheck();
        //console.log(this.listaarray);
      }
    );
  }



  minbg(id: number){
    this.risorse_base --;
    this.schedaservice.putbg(this.idutente, id, this.risorse_base, 'A' ).subscribe();
  }

  addbg(id: number){
    this.risorse_base ++;
    this.schedaservice.putbg(this.idutente, id , this.risorse_base, 'A' ).subscribe();
  }

  addspesa(){

    this.schedaservice.addspesa(this.idutente, this.spesa!.value, this.recupero!.value).subscribe(
      () => {
        this.RisorseForm.reset();
        this.cdr.markForCheck();

        this.schedaservice.getrisorse<GetRisorse>(this.idutente).subscribe(
          (data: GetRisorse) => {
            this.saldo = data.saldo;
            this.listaarray = data.lista;
            this.cdr.markForCheck();
            //console.log(this.listaarray);
          });

      }
    );


    
  }

  get spesa() {
    return this.RisorseForm.get('spesa');
  }
  get recupero() {
    return this.RisorseForm.get('recupero');
  }


  validateRisorse (control: AbstractControl) : Observable<ValidationErrors | null> {
    const spesa = Number(control.value);
    const esito = (this.RisorseForm == undefined) || (spesa > this.risorse_base + this.saldo) || spesa < 1 ? { notok: true } : null;
    //console.log(esito); 
    //const esito = null;
    //console.log("here");
    return of(esito);
  }

  addcontanti(){
    this.schedaservice.addcontanti(this.idutente).subscribe(
      () => {
        this.contanti++;
        this.cdr.markForCheck();
      }
    )
    
  }
  mincontanti(){
    this.schedaservice.mincontanti(this.idutente).subscribe(
      () => {    
        this.contanti--;
        this.cdr.markForCheck();
      }
    )
    
  }

}
