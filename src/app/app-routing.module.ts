import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { GateComponent } from './gate/gate.component';
import { AdminComponent } from './admin/admin.component';
import { CreaComponent } from './crea/crea.component';
import { SchedaComponent } from './scheda/scheda.component';
import { AddpoteriComponent } from './addpoteri/addpoteri.component';
import { LogpxComponent } from './logpx/logpx.component';
import { SpendipxComponent } from './spendipx/spendipx.component';
import { PregidifettiComponent } from './pregidifetti/pregidifetti.component';
import { RegistraComponent } from './registra/registra.component';
import { BioComponent } from './bio/bio.component';
import { BackgroundComponent } from './background/background.component';
import { CancellaComponent } from './cancella/cancella.component';
import { DocsComponent } from './docs/docs.component';
import { UtenteComponent } from './utente/utente.component';
import { PersonaggioComponent } from './personaggio/personaggio.component';
import { AdminbgComponent } from "./adminbg/adminbg.component";
import { OggettiComponent } from "./oggetti/oggetti.component";
import { CambiaoggComponent } from "./cambiaogg/cambiaogg.component";
import { ChatComponent } from "./chat/chat.component";
import { RubricaComponent } from "./rubrica/rubrica.component";

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'main', component: MainComponent },
  { path: 'gate', component: GateComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'crea', component: CreaComponent },
  { path: 'scheda', component: SchedaComponent },
  { path: 'poteri', component: AddpoteriComponent },
  { path: 'logpx', component: LogpxComponent },
  { path: 'spendipx', component: SpendipxComponent },
  { path: 'pregidifetti', component: PregidifettiComponent },
  { path: 'registra', component: RegistraComponent },
  { path: 'bio', component: BioComponent },
  { path: 'background', component: BackgroundComponent },
  { path: 'cancella', component: CancellaComponent },
  { path: 'docs', component: DocsComponent },
  { path: 'utente', component: UtenteComponent },
  { path: 'personaggio/:id', component: PersonaggioComponent },
  { path: 'adminbg/:id', component: AdminbgComponent },
  { path: 'oggetti', component: OggettiComponent },
  { path: 'cambiaogg/:id', component: CambiaoggComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'rubrica', component: RubricaComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
