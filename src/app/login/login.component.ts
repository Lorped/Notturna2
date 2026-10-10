import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/index';
import { Router } from '@angular/router';
import { GlobalStatus } from '../global';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, ReactiveFormsModule, RouterLink],
})
export class LoginComponent implements OnInit {

  loginForm = new UntypedFormGroup ({
    nome: new UntypedFormControl('', [
      Validators.required
    ]),
    password: new UntypedFormControl('', [
      Validators.required
    ]),
  });

  loginInvalid = false ;
  hide = true ;

  private authenticationService = inject(AuthenticationService);
  private router = inject(Router);
  private globalstatus = inject(GlobalStatus);
  private cdr = inject(ChangeDetectorRef);


  ngOnInit(): void {
    this.authenticationService.logout();
  }

  togglePasswordVisibility(event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.hide = !this.hide;
  }

  get nome() {
      return this.loginForm.get('nome');
  }
  get password() {
    return this.loginForm.get('password');
  }



  doLogin() {

    this.loginInvalid = false;

    this.authenticationService.login(this.nome!.value, this.password!.value)
      .subscribe(
        data => {

          if (data.admin !== 0){
            this.globalstatus.cronacaprincipale = data.admin;
            this.globalstatus.cronacadescrizione = data.cronacadescrizione;
            //console.log('Login admin: ' + this.globalstatus.cronacaprincipale + ' - ' + this.globalstatus.cronacadescrizione);  
            this.router.navigate(['/admin']);
          } else {
            if (data.scheda === 0){
              this.router.navigate(['/gate']);
            } else {
              this.router.navigate(['/main']);
            }
          }


        },
        () => {
          this.loginInvalid = true;
          this.cdr.markForCheck();
        });
  }

}
