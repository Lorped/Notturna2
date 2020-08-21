import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/index';
import { Oggetto, Condizione, FullOggetto} from '../global';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cambiaogg',
  templateUrl: './cambiaogg.component.html',
  styleUrls: ['./cambiaogg.component.css']
})
export class CambiaoggComponent implements OnInit {

  valcondA = new FormControl('', [
    Validators.required,
    Validators.max(10),
    Validators.min(1)
  ]);
  valcondS = new FormControl('', [
    Validators.required,
    Validators.max(10),
    Validators.min(1)
  ]);
  valcondD = new FormControl('', [
    Validators.required,
    Validators.max(10),
    Validators.min(1)
  ]);
  valcondP = new FormControl('', [
    Validators.required,
    Validators.max(10),
    Validators.min(1)
  ]);

  item = new FullOggetto();

  attributi: Array<any> = [];
  skill: Array<any> = [];
  poteri: Array<any> = [];
  discipline: Array<any> = [];

  tabcondA = '';
  tabcondS = '';
  tabcondP = '';
  tabcondD = '';

  descrizioneA = '';
  descrizioneS = '';
  descrizioneP = '';
  descrizioneD = '';

  constructor(private adminservice: AdminService) { }

  ngOnInit(): void {
    /*
    const state = navigation.extras.state as {
      obj: FullOggetto
    };
    */
    this.item =  window.history.state.obj ;

    this.adminservice.getcondizioni().subscribe(
      (data: any) => {
        this.skill = data.skill;
        this.poteri = data.poteri;
        this.attributi = data.attributi;
        this.discipline = data.discipline;

        console.log(this.skill);
      }
    );



  }

  cancellacond(idcond: number){
    console.log(idcond);

    console.log (this.valcondA);
    console.log (this.tabcondA);
    console.log (this.descrizioneA);
  }

  addcond(tipo: string){
    console.log(tipo);
    switch (tipo) {
      case 'A':
        console.log(this.valcondA.value);
        console.log(this.tabcondA);
        console.log(this.descrizioneA);
        break;
      case 'S':
        console.log(this.valcondS.value);
        console.log(this.tabcondS);
        console.log(this.descrizioneS);
        break;
      case 'P':
        console.log(this.valcondP.value);
        console.log(this.tabcondP);
        console.log(this.descrizioneP);
        break;
      case 'D':
        console.log(this.valcondD.value);
        console.log(this.tabcondD);
        console.log(this.descrizioneD);
        break;
    }
    this.tabcondA = '';
    this.tabcondS = '';
    this.tabcondP = '';
    this.tabcondD = '';

    this.descrizioneA = '';
    this.descrizioneS = '';
    this.descrizioneP = '';
    this.descrizioneD = '';
    this.valcondA.setValue('');
    this.valcondS.setValue('');
    this.valcondD.setValue('');
    this.valcondP.setValue('');
  }

}
