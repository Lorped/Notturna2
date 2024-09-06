import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
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

  constructor( private authenticationService: AuthenticationService , private router: Router) { }

  ngOnInit(): void {
    this.authenticationService.logout();
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

          if (data.admin == '1'){
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
