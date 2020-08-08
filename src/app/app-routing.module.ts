import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { GateComponent } from './gate/gate.component';
import { AdminComponent } from './admin/admin.component';
import { CreaComponent } from './crea/crea.component';
import { SchedaComponent } from './scheda/scheda.component';
import { AddpoteriComponent } from './addpoteri/addpoteri.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'main', component: MainComponent },
  { path: 'gate', component: GateComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'crea', component: CreaComponent },
  { path: 'scheda', component: SchedaComponent },
  { path: 'poteri', component: AddpoteriComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
