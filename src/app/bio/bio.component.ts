import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SchedaService } from '../services/index';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.css']
})
export class BioComponent implements OnInit {


  bio =  new FormControl('', [] ) ;
  annotazioni = new FormControl('', [] ) ;
  urlDT = new FormControl('', [] ) ;

  idutente = 0;


  constructor( private schedaservice: SchedaService) { }

  ngOnInit(): void {

    this.idutente = Number( sessionStorage.getItem('NotturnaUser') );

    this.schedaservice.getbio(this.idutente).subscribe(
      (data: any) => {
        this.bio.setValue( data.bio );
        this.annotazioni.setValue( data.note );
        this.urlDT.setValue( data.urldt );
      }
    );

  }

  aggiornaBio () {

    this.schedaservice.putbio ( this.idutente , this.bio.value , this.annotazioni.value , this.urlDT.value)
    .subscribe(
      (data: any) => {
        this.bio!.markAsPristine();
        this.annotazioni!.markAsPristine();
        this.urlDT.markAsPristine();
        this.bio!.markAsUntouched();
        this.annotazioni!.markAsUntouched();
        this.urlDT.markAsUntouched();
      }
    );

  }
}
