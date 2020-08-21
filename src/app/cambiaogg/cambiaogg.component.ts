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

  idoggetto = 0;

  domanda = '';
  rispSi = '';
  rispNo = '';

  quandoA = 'x';
  quandoS = 'x';
  quandoD = 'x';
  quandoP = 'x';
  quando: { id: string, nome: string }[] = [
    {id: 'x', nome: 'Sempre'} ,
    {id: 'S', nome: 'Se SI'} ,
    {id: 'N', nome: 'Se NO'}
  ];

  constructor(private route: ActivatedRoute , private adminservice: AdminService) { }

  ngOnInit(): void {

    this.idoggetto = Number ( this.route.snapshot.paramMap.get('id') );
    this.item =  window.history.state.obj ;

    this.adminservice.getcondizioni().subscribe(
      (data: any) => {
        this.skill = data.skill;
        this.poteri = data.poteri;
        this.attributi = data.attributi;
        this.discipline = data.discipline;

      }
    );



  }

  cancellacond(idcond: number){
    this.adminservice.cancellacondizione(idcond).subscribe(
      (data) => {
        for ( let j = 0 ; j < this.item.condizioni.length ; j++ ){
          if ( this.item.condizioni[j].idcondizione == idcond ) {
            this.item.condizioni.splice(j,1);
          }
        }
        for ( let j = 0 ; j < this.item.condizioni2.length ; j++ ){
          if ( this.item.condizioni2[j].idcondizione == idcond ) {
            this.item.condizioni2.splice(j,1);
          }
        }
      }
    );
  }

  addcond(tipo: string){
    let tipocond = '';
    let vc = '' ;
    let tc = '' ;
    let desc = '';
    let mytipocond = '';
    let risp = '';

    switch (tipo) {
      case 'A':
        tipocond = 'A';
        vc = this.valcondA.value;
        tc = this.tabcondA;
        desc = this.descrizioneA;
        for ( let aa of this.attributi) {
          if ( aa.idattr == Number(tc) ){
            mytipocond = aa.nomeattr;
          }
        }
        risp = this.quandoA;
        break;
      case 'S':
        tipocond = 'S';
        vc = this.valcondS.value;
        tc = this.tabcondS;
        desc = this.descrizioneS;
        for ( let aa of this.skill) {
          if ( aa.idskill == Number(tc) ){
            mytipocond = aa.nomeskill;
          }
        }
        risp = this.quandoS;
        break;
      case 'P':
        tipocond = 'P';
        vc = '1';
        tc = this.tabcondP;
        desc = this.descrizioneP;
        for ( let aa of this.poteri) {
          if ( aa.idpotere == Number(tc) ){
            mytipocond = aa.nomepotere;
          }
        }
        risp = this.quandoP;
        break;
      case 'D':
        tipocond = 'D';
        vc = this.valcondD.value;
        tc = this.tabcondD;
        desc = this.descrizioneD;
        for ( let aa of this.discipline) {
          if ( aa.iddisc == tc){
            mytipocond = aa.nomedisc;
          }
        }
        risp = this.quandoD;
        break;
    }

    this.adminservice.addcondizione(this.idoggetto, tipocond, Number(tc) , Number(vc) , desc , risp).subscribe(
      (data: any) => {
        let mycond = new Condizione();
        mycond.idcondizione = data;
        mycond.idoggetto = this.idoggetto;
        mycond.tipocond = mytipocond;
        mycond.tabcond = Number(tc);
        mycond.valcond = Number(vc);
        mycond.descrX = desc;
        mycond.risp = risp;
        if ( risp == 'x') {
          mycond.risp = '';
          this.item.condizioni.push( mycond );
        } else {
          this.item.condizioni2.push( mycond );
        }

      }
    );


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
  }

  adddomanda(){
    this.adminservice.adddomanda(this.idoggetto, this.domanda, this.rispSi, this.rispNo).subscribe(
      (data) => {
        this.item.oggetto.domanda = this.domanda;
        this.item.oggetto.r1 = this.rispSi;
        this.item.oggetto.r2 = this.rispNo;
        this.item.oggetto.ifdomanda = 1;
        this.domanda = '';
        this.rispSi = '';
        this.rispNo = '';
      }
    );
  }

  cancelladomanda(){
    this.adminservice.cancdomanda(this.idoggetto).subscribe(
      (data) => {
        this.item.oggetto.domanda = '';
        this.item.oggetto.r1 = '';
        this.item.oggetto.r2 = '';
        this.item.oggetto.ifdomanda = 0;
        this.item.condizioni2.length = 0;
      }
    );
  }

}
