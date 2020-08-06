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
  public sentiero = ''; //da LEFT JOIN
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
  public bane = 0 ;
  public urldt = '';
}

@Injectable()
export class Potere {
  public idpotere = 0;
  public nomepotere = '';
  public livellopot = 0;
  public iddisciplina = 0;
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
export class Disciplina {
  public iddisciplina: number ;
  public nomedisc: string ;
  public livello: number ;
  public DiClan: string ;
  constructor ( ) {
    this.iddisciplina = 0;
    this.nomedisc = '';
    this.livello = 0;
    this.DiClan = '';
  }
}

@Injectable()
export class FullDisciplina {
  public disciplina = new Disciplina ;
  public poteri: Array<Potere> = [];
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
export class Necromanzia {
  public idnecro = 0;
  public nomenecro = '';
  public livello = 0 ;
}

@Injectable()
export class Taumaturgia {
  public idtaum = 0;
  public nometaum = '';
  public livello = 0 ;
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
    this.aPG = new Basicpg ;
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
