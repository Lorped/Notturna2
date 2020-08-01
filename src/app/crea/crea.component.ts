import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SchedaService } from '../services/index';
import { Clan , Status } from '../global';

@Component({
  selector: 'app-crea',
  templateUrl: './crea.component.html',
  styleUrls: ['./crea.component.css']
})
export class CreaComponent implements OnInit {

  clan: Array<Clan> = [];
  status: Array<Status> = [];


  creaForm = new FormGroup ({
    nomepersonaggio: new FormControl('', [
      Validators.required
    ]),
    nomeplayer: new FormControl('', [
      Validators.required
    ]),
    clanPG: new FormControl('', [
      Validators.required,
    ]),
    status: new FormControl('', [
      Validators.required,
    ]),
    rifugio: new FormControl('', [
      Validators.required,
    ]),
    zona: new FormControl('', [
      Validators.required,
    ]),
  });


  constructor(private schedaservice: SchedaService) { }

  ngOnInit(): void {

    this.schedaservice.getregistra()
      .subscribe(
        (data: any) => {
          console.log(data);
          this.clan = data.clan;
          this.status = data.statuscama;
        });
  }

  doCrea() {}

}
