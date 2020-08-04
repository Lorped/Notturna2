import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// MATERIAL
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import {MatCheckboxModule} from '@angular/material/checkbox';
//

import { AuthenticationService } from './services/index';
import { SchedaService } from './services/index';

import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { GateComponent } from './gate/gate.component';
import { AdminComponent } from './admin/admin.component';
import { RegistraComponent } from './registra/registra.component';
import { CreaComponent } from './crea/crea.component';
import { TimesPipe } from './times.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    GateComponent,
    AdminComponent,
    RegistraComponent,
    CreaComponent,
    TimesPipe
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
    MatCheckboxModule


  ],
  providers: [
    AuthenticationService,
    SchedaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
