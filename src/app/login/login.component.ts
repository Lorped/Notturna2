import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/index';
import { Router } from '@angular/router';
import { GlobalStatus } from '../global';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
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

  constructor( private authenticationService: AuthenticationService , private router: Router, private globalstatus: GlobalStatus) { }

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

          if (data.admin !== '0'){
            this.globalstatus.cronacaprincipale = data.admin;
            this.globalstatus.cronacadescrizione = data.cronacadescrizione;
            console.log('Login admin: ' + this.globalstatus.cronacaprincipale + ' - ' + this.globalstatus.cronacadescrizione);  
            this.router.navigate(['/admin']);
          } else {
            if (data.scheda == '0' ){
              this.router.navigate(['/gate']);
            } else {
              this.router.navigate(['/main']);
            }
          }


        },
        error => {
          this.loginInvalid = true;
        });
  }

}
