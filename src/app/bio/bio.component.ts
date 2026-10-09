import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { SchedaService } from '../_services/index';

interface BioData {
  bio: string;
  note: string;
  notemaster: string;
}

@Component({
    selector: 'app-bio',
    templateUrl: './bio.component.html',
    styleUrls: ['./bio.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class BioComponent implements OnInit {


  bio =  new UntypedFormControl('', [] ) ;
  annotazioni = new UntypedFormControl('', [] ) ;
  // urlDT = new UntypedFormControl('', [] ) ;

  idutente = 0;

  private schedaservice = inject(SchedaService);


  ngOnInit(): void {

    this.idutente = Number( sessionStorage.getItem('NotturnaUser') );

    this.schedaservice.getbio<BioData>(this.idutente).subscribe(
      (data: BioData) => {
        this.bio.setValue( data.bio );
        this.annotazioni.setValue( data.note );
      }
    );

  }

  aggiornaBio() {

    this.schedaservice.putbio ( this.idutente , this.bio.value , this.annotazioni.value )
    .subscribe(
      () => {
        this.bio!.markAsPristine();
        this.annotazioni!.markAsPristine();
        this.bio!.markAsUntouched();
        this.annotazioni!.markAsUntouched();
      }
    );

  }
}
