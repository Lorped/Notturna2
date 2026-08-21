import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AdminService } from '../_services/index';
import { Oggetto, Condizione, FullOggetto, Unpaired, Skill, SubSkill} from '../global';
import { Router, ActivatedRoute } from '@angular/router';
import { UntypedFormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-cambiaogg',
    templateUrl: './cambiaogg.component.html',
    styleUrls: ['./cambiaogg.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class CambiaoggComponent implements OnInit {

  valcondA = new UntypedFormControl('', [
    Validators.required,
    Validators.max(10),
    Validators.min(1)
  ]);
  valcondS = new UntypedFormControl('', [
    Validators.required,
    Validators.max(10),
    Validators.min(1)
  ]);
  valcondD = new UntypedFormControl('', [
    Validators.required,
    Validators.max(10),
    Validators.min(1)
  ]);
  valcondSS = new UntypedFormControl('', [
    Validators.required,
    Validators.max(10),
    Validators.min(1)
  ]);
  valcondX = new UntypedFormControl('', [
    Validators.required,
    Validators.max(10),
    Validators.min(1)
  ]);


  item = new FullOggetto();

  attributi: Array<any> = [];
  skill: Array<Skill> = [];
  otherskill: Array<Skill> = [];
  poteri: Array<any> = [];
  discipline: Array<any> = [];

  subskill: Array<SubSkill> = [];

  tabcondA = '';
  tabcondS = '';
  tabcondSS = '';
  tabcondX = '';
  tabcondP = '';
  tabcondD = '';

  descrizioneA = '';
  descrizioneS = '';
  descrizioneSS = '';
  descrizioneX  = ''; //altri skill
  descrizioneP = '';
  descrizioneD = '';

  idoggetto = 0;
  nomeoggettoIniziale = '';
  descrizioneIniziale = '';

  domanda = '';
  rispSi = '';
  rispNo = '';

  quandoA = 'x';
  quandoS = 'x';
  quandoSS = 'x';
  quandoX = 'x';
  quandoD = 'x';
  quandoP = 'x';
  quando: { id: string, nome: string }[] = [
    {id: 'x', nome: 'Sempre'} ,
    {id: 'S', nome: 'Se SI'} ,
    {id: 'N', nome: 'Se NO'}
  ];

  unpaired: Array<Unpaired> = [];
  tabpaired = '';
  descrizionePaired = '';

  constructor(private route: ActivatedRoute , private adminservice: AdminService) { }

  ngOnInit(): void {

    this.idoggetto = Number ( this.route.snapshot.paramMap.get('id') );
    this.item =  window.history.state.obj ;
    this.nomeoggettoIniziale = this.item.oggetto.nomeoggetto;
    this.descrizioneIniziale = this.item.oggetto.descrizione;

    this.adminservice.getcondizioni().subscribe(
      (data: any) => {
        this.skill = data.skill;
        this.otherskill = data.otherskill;
        this.poteri = data.poteri;
        this.attributi = data.attributi;
        this.discipline = data.discipline;

      }
    );

    this.adminservice.getunpaired(this.idoggetto).subscribe(
      (data: any) => {
        this.unpaired = data.unpaired;
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
    let mysubskill = 0;

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
      case 'X':
        tipocond = 'X';     
        vc = this.valcondX.value;
        tc = this.tabcondX;
        desc = this.descrizioneX;
        for ( let aa of this.otherskill) {
          if ( aa.idskill == Number(tc) ){
            mytipocond = aa.nomeskill;
          }
        }
        risp = this.quandoX;
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
      case 'SS':
        tipocond = 'SS';
        vc = this.valcondSS.value;
        tc = this.tabcondSS;
        desc = this.descrizioneSS;
        for ( let aa of this.subskill) {
          if ( aa.idskill == Number(tc) ){
            mytipocond = aa.nomeskill;
            mysubskill = aa.subskill;
          }
        }
        risp = this.quandoSS;
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
          if ( aa.iddisciplina == tc){
            mytipocond = aa.nomedisc;
          }
        }
        risp = this.quandoD;
        break;
    }

    //console.log( "prima di adminservice.addcondizione: ", tipocond, tc, vc, desc, risp, mysubskill);

    this.adminservice.addcondizione(this.idoggetto, tipocond, Number(tc) , Number(vc) , desc , risp, mysubskill).subscribe(
      (data: any) => {
        let mycond = new Condizione();
        mycond.idcondizione = data;
        mycond.idoggetto = this.idoggetto;
        mycond.tipocond = mytipocond;
        mycond.tabcond = Number(tc);
        mycond.valcond = Number(vc);
        mycond.descrX = desc;
        mycond.risp = risp;

        console.log("aggiunta condizione: ", mycond);

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
    this.tabcondSS = '';
    this.tabcondX = '';
    this.tabcondP = '';
    this.tabcondD = '';

    this.descrizioneA = '';
    this.descrizioneS = '';
    this.descrizioneS = '';
    this.descrizioneSS = '';
    this.descrizioneX = '';
    this.descrizioneP = '';
    this.descrizioneD = '';
    this.valcondA.setValue('');
    this.valcondS.setValue('');
    this.valcondSS.setValue('');
    this.valcondD.setValue('');
    this.valcondX.setValue('');

    this.subskill = [];
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

  cancellapaired(){
    this.adminservice.cancellapaired(this.idoggetto).subscribe(
      (data) => {
        this.item.paired.idpaired = 0;
        this.item.paired.descpaired = '';
        this.item.paired.nomepaired = '';
        console.log("cancello paired");

        this.adminservice.getunpaired(this.idoggetto).subscribe(
          (data: any) => {
            this.unpaired = data.unpaired;
          }
        );



      } 
    );
  }

  addpaired(){
      console.log("aggiungo paired");
      console.log("idoggetto1: " + this.idoggetto);
      console.log("idoggetto2: " + Number(this.tabpaired));
      console.log("descpaired: " + this.descrizionePaired);

      const result = this.unpaired.find(unpaired => unpaired.idoggetto == Number(this.tabpaired));

      console.log("nomepaired: " + result?.nomeoggetto);

      
      
      this.adminservice.addpaired(this.idoggetto, Number(this.tabpaired), this.descrizionePaired).subscribe(
        (data) => {
          this.item.paired.idpaired = Number(this.tabpaired);
          this.item.paired.descpaired = this.descrizionePaired;
          this.item.paired.nomepaired = result?.nomeoggetto ?? '';
          console.log("add paired");

          this.tabpaired = '';
          this.descrizionePaired = '';
        } 
      );
    
  }

  aggiornaogg(idoggetto: number){
    this.adminservice.cambiaogg(idoggetto, this.item.oggetto.nomeoggetto, this.item.oggetto.descrizione).subscribe(
      (data) => {
         this.nomeoggettoIniziale = this.item.oggetto.nomeoggetto;
         this.descrizioneIniziale = this.item.oggetto.descrizione;
         console.log("aggiornato oggetto");
      }
    );
    

  }

  oggettoModificato(): boolean {
    return this.item.oggetto.nomeoggetto !== this.nomeoggettoIniziale
      || this.item.oggetto.descrizione !== this.descrizioneIniziale;
  }
  aggiornasubskill() {
    //console.log("skill", this.skill);
    //console.log("tabcondS", this.tabcondS);
    const selectedSkill = this.skill.find(skill => skill.idskill == Number(this.tabcondS));
    //console.log("selectedSkill: ", selectedSkill);
    this.subskill = selectedSkill ? selectedSkill.subskill2 : [];  
    //console.log("subskill: ", this.subskill);
  }

}