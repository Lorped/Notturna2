import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  { path: 'main', loadComponent: () => import('./main/main.component').then(m => m.MainComponent) },
  { path: 'gate', loadComponent: () => import('./gate/gate.component').then(m => m.GateComponent) },
  { path: 'admin', loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent) },
  { path: 'crea', loadComponent: () => import('./crea/crea.component').then(m => m.CreaComponent) },
  { path: 'scheda', loadComponent: () => import('./scheda/scheda.component').then(m => m.SchedaComponent) },
  { path: 'poteri', loadComponent: () => import('./addpoteri/addpoteri.component').then(m => m.AddpoteriComponent) },
  { path: 'logpx', loadComponent: () => import('./logpx/logpx.component').then(m => m.LogpxComponent) },
  { path: 'spendipx', loadComponent: () => import('./spendipx/spendipx.component').then(m => m.SpendipxComponent) },
  { path: 'pregidifetti', loadComponent: () => import('./pregidifetti/pregidifetti.component').then(m => m.PregidifettiComponent) },
  { path: 'registra', loadComponent: () => import('./registra/registra.component').then(m => m.RegistraComponent) },
  { path: 'bio', loadComponent: () => import('./bio/bio.component').then(m => m.BioComponent) },
  { path: 'background', loadComponent: () => import('./background/background.component').then(m => m.BackgroundComponent) },
  { path: 'cancella', loadComponent: () => import('./cancella/cancella.component').then(m => m.CancellaComponent) },
  { path: 'docs', loadComponent: () => import('./docs/docs.component').then(m => m.DocsComponent) },
  { path: 'utente', loadComponent: () => import('./utente/utente.component').then(m => m.UtenteComponent) },
  { path: 'personaggio/:id', loadComponent: () => import('./personaggio/personaggio.component').then(m => m.PersonaggioComponent) },
  { path: 'adminbg/:id', loadComponent: () => import('./adminbg/adminbg.component').then(m => m.AdminbgComponent) },
  { path: 'oggetti', loadComponent: () => import('./oggetti/oggetti.component').then(m => m.OggettiComponent) },
  { path: 'cambiaogg/:id', loadComponent: () => import('./cambiaogg/cambiaogg.component').then(m => m.CambiaoggComponent) },
  { path: 'chat', loadComponent: () => import('./chat/chat.component').then(m => m.ChatComponent) },
  { path: 'rubrica', loadComponent: () => import('./rubrica/rubrica.component').then(m => m.RubricaComponent) },
  { path: 'eventi', loadComponent: () => import('./eventi/eventi.component').then(m => m.EventiComponent) },
  { path: 'risorse/:id', loadComponent: () => import('./risorse/risorse.component').then(m => m.RisorseComponent) },
  { path: 'logpxadm/:id', loadComponent: () => import('./logpxadm/logpxadm.component').then(m => m.LogpxadmComponent) },
  { path: 'prestampa', loadComponent: () => import('./prestampa/prestampa.component').then(m => m.PrestampaComponent) },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];
