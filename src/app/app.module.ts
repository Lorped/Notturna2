import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// MATERIAL

//import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';
//import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
//import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {MatIconModule} from '@angular/material/icon';
//import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';
//import {MatLegacySelectModule as MatSelectModule} from '@angular/material/legacy-select';
import {MatStepperModule} from '@angular/material/stepper';
//import {MatLegacyCheckboxModule as MatCheckboxModule} from '@angular/material/legacy-checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
//import {MatLegacyListModule as MatListModule} from '@angular/material/legacy-list';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSidenavModule} from '@angular/material/sidenav';

//
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSliderModule} from '@angular/material/slider';
import {MatListModule} from '@angular/material/list';
import {MatRadioModule} from '@angular/material/radio';



import { Basicpg, GlobalStatus } from './global';

import { AuthenticationService } from './_services/index';
import { SchedaService } from './_services/index';
import { ChatService } from './_services/index';
import { RubricaService } from './_services/index';

import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { GateComponent } from './gate/gate.component';
import { AdminComponent } from './admin/admin.component';
import { RegistraComponent } from './registra/registra.component';
import { CreaComponent } from './crea/crea.component';
import { TimesPipe } from './times.pipe';
import { SchedaComponent } from './scheda/scheda.component';
import { NonecrotaumPipe } from './nonecrotaum.pipe';
import { AddpoteriComponent } from './addpoteri/addpoteri.component';
import { LogpxComponent } from './logpx/logpx.component';
import { SpendipxComponent } from './spendipx/spendipx.component';
import { SidexComponent } from './sidex/sidex.component';
import { PregidifettiComponent } from './pregidifetti/pregidifetti.component';
import { BioComponent } from './bio/bio.component';
import { BackgroundComponent } from './background/background.component';
import { CancellaComponent } from './cancella/cancella.component';
import { DocsComponent } from './docs/docs.component';
import { UtenteComponent } from './utente/utente.component';
import { PersonaggioComponent } from './personaggio/personaggio.component';
import { SideadmComponent } from './sideadm/sideadm.component';
import { AdminbgComponent } from './adminbg/adminbg.component';
import { OggettiComponent } from './oggetti/oggetti.component';
import { CambiaoggComponent } from './cambiaogg/cambiaogg.component';
import { ChatComponent } from './chat/chat.component';
import { RubricaComponent } from './rubrica/rubrica.component';
import { EventiComponent } from './eventi/eventi.component';
import { RisorseComponent } from './risorse/risorse.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    GateComponent,
    AdminComponent,
    RegistraComponent,
    CreaComponent,
    TimesPipe,
    SchedaComponent,
    NonecrotaumPipe,
    AddpoteriComponent,
    LogpxComponent,
    SpendipxComponent,
    SidexComponent,
    PregidifettiComponent,
    BioComponent,
    BackgroundComponent,
    CancellaComponent,
    DocsComponent,
    UtenteComponent,
    PersonaggioComponent,
    SideadmComponent,
    AdminbgComponent,
    OggettiComponent,
    CambiaoggComponent,
    ChatComponent,
    RubricaComponent,
    EventiComponent,
    RisorseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatToolbarModule,
    MatSelectModule,
    MatStepperModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatListModule,
    MatBadgeModule,
    MatSidenavModule,
    MatRadioModule


  ],
  providers: [
    AuthenticationService,
    SchedaService,
    ChatService,
    RubricaService,
    GlobalStatus
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
