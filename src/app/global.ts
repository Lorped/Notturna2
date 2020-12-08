import { Injectable } from '@angular/core';


@Injectable()
export class Basicpg {
  public idutente = 0 ;
  public nomeplayer = '' ;
  public nomepg = '';
  public idclan = 0;
  public nomeclan = ''; // from LEFT JOIN
  public generazione = 0;
  public forza = 0;
  public destrezza = 0;
  public attutimento = 0;
  public carisma = 0;
  public persuasione = 0;
  public saggezza = 0;
  public percezione = 0;
  public prontezza = 0;
  public intelligenza = 0;
  public fdv = 0;
  public fdvmax = 0;
  public idstatus = 0;
  public status = ''; // da LEFT JOIN
  public attivazione = 0  ; // da LEFT JOIN
  public sete = 0  ; // da LEFT JOIN
  public addsete = 0  ; // da LEFT JOIN
  public PScorrenti = 0 ;

  public idsentiero = 0;
  public sentiero = ''; // da LEFT JOIN
  public valsentiero = 0 ;
  public fama1 = 0 ;
  public fama2 = 0 ;
  public fama3 = 0 ;

  public xp = 0 ;
  public xpspesi = 0 ;

  public bio = '';
  public note = '';
  public rifugio = '';
  public zona = '';

  public bloodp = 0;
  public bloodpmax = 0;  // from LEFT JOIN
  public bloodpmin = 0;  // FROM LEFT JOIN
  public bane = 0 ;
  public urldt = '';
}

@Injectable()
export class Potere {
  public idpotere: number;
  public nomepotere: string;
  public livellopot: number;
  public iddisciplina: number;
  constructor() {
    this.idpotere = 0;
    this.nomepotere = '';
    this.livellopot = 0;
    this.iddisciplina = 0;
  }
}

@Injectable()
export class Newpotere {
  public potere = new Potere() ;
  public disabled = 0 ;
}

@Injectable()
export class Background {
  public idback = 0;
  public nomeback = '';
  public livello = 0;
  public MaxIniziale = 0;
  public MinIniziale = 0;
}


@Injectable()
export class Contatti {
  public idcontatto = 0;
  public nomecontatto = '';
  public livello = 0;
}

@Injectable()
export class Pregio {
  public idpregio = 0;
  public nomepregio = '';
  public valore = 0;
  public classe = '';
  public pxspesi = 0 ;
}

@Injectable()
export class Rituale {
  public idrituale = 0;
  public nomerituale = '';
  public livello = 0;
}

@Injectable()
export class Disciplina {
  public iddisciplina: number ;
  public nomedisc: string ;
  public livello: number ;
  public DiClan: string ;
  constructor() {
    this.iddisciplina = 0;
    this.nomedisc = '';
    this.livello = 0;
    this.DiClan = '';
  }
}

@Injectable()
export class FullDisciplina {
  public disciplina = new Disciplina() ;
  public poteri: Array<Potere> = [];
  public newpoteri: Array<Newpotere> = [];
}

@Injectable()
export class Skill {
  public idskill = 0;
  public nomeskill = '';
  public livello = 0;
  public tipologia = 0;
}

@Injectable()
export class Abilita {
  public idskill = 0;
  public nomeskill = '';
  public livello = 0;
}

@Injectable()
export class Necros {
  public nomenecro2 = '';
  public livello = 0;
}

@Injectable()
export class Taums {
  public nometaum2 = '';
  public livello = 0;
}

@Injectable()
export class Necromanzia {
  public idnecro: number;
  public nomenecro: string;
  public livello: number;
  public principale: number;
  constructor( ) {
    this.idnecro = 0;
    this.nomenecro = '';
    this.livello = 0 ;
    this.principale = 1;
  }
}


@Injectable()
export class Taumaturgia {
  public idtaum: number;
  public nometaum: string;
  public livello: number;
  public principale: number;
  constructor( ) {
    this.idtaum = 0;
    this.nometaum = '';
    this.livello = 0 ;
    this.principale = 1;
  }
}

@Injectable()
export class FullNecromanzia {
  public necromanzia = new Necromanzia() ;
  public necros: Array<Necros> = [];
}

@Injectable()
export class FullTaumaturgia {
  public taumaturgia = new Taumaturgia() ;
  public taums: Array<Taums> = [];
}





@Injectable()
export class Personaggio {

  public aPG: Basicpg;

  public listaBackground: Array<Background> ;
  public listaContatti: Array<Contatti> ;
  public listaDiscipline: Array<Disciplina> ;
  public listaSkill: Array<Skill>;
  public listaAbilita: Array<Abilita>;


  constructor ( ) {
    this.aPG = new Basicpg() ;
    this.listaBackground = [];
    this.listaContatti = [];
    this.listaDiscipline = [];
    this.listaSkill = [];
    this.listaAbilita = [];
  }

}



@Injectable()
export class Clan {
  idclan = 0;
  nomeclan = '';
}

@Injectable()
export class Status {
  idstatus = 0;
  status = '';
}

/* @Injectable() */
export class Attributo {
  public IDattributo: number;
  public NomeAttributo: string;
  public Tipologia: string;
  public Livello: number;
  constructor ( id: number, n: string, t: string, l: number) {
    this.IDattributo = id ;
    this.NomeAttributo = n;
    this.Tipologia = t;
    this.Livello = l;
  }

}

@Injectable()
export class Sentiero {
  idsentiero = 0;
  sentiero = '';
}

@Injectable()
export class Oggetto {
  idoggetto: number;
  barcode: number;
  nomeoggetto: string;
  descrizione: string;
  fissomobile: string;
  ifdomanda: number;
  domanda: string;
  r1: string;
  r2: string;
  constructor(  ) {
    this.idoggetto = 0 ;
    this.barcode = 0;
    this.nomeoggetto = '';
    this.descrizione = '';
    this.fissomobile = ''
    this.ifdomanda = 0;
    this.domanda = '';
    this.r1 = '';
    this.r2 = '';
  }
}

@Injectable()
export class Condizione {
  idoggetto = 0;
  idcondizione = 0;
  tipocond = '';
  tabcond = 0;
  valcond = 0;
  descrX = '';
  risp = '';
}

@Injectable()
export class FullOggetto {
  public oggetto = new Oggetto() ;
  public condizioni: Array<Condizione> = [];
  public condizioni2: Array<Condizione> = [];
}

@Injectable()
export class GlobalStatus {
  Last = 0;
  lastpg = 0;
}


@Injectable()
export class Rubricaitem {
  public idrubrica = 0;
  public owner = 0;
  public contatto = '';
  public cell = 0;
  public email = 0 ;
  public home = 0 ;
  public note = '';
}
