import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup ({
    nome: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
  });

  loginInvalid: boolean = false ;
  hide: boolean = true ;

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

          if (data.admin == "1"){
            this.router.navigate(['/admin']);
          } else {
            if (data.vampiro == 0 && data.hunter == 0){
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
