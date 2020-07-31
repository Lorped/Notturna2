import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginCredentials = { nome: '' , password: '' };
  errmsg = '';

  constructor(private authenticationService: AuthenticationService ) { }

  ngOnInit(): void {
    this.authenticationService.logout();
  }

  doLogin() {
    this.authenticationService.login(this.loginCredentials.nome, this.loginCredentials.password)
      .subscribe(
        data => {
          console.log(data);
          //this.router.navigate(['']);
        },
        error => {
          this.errmsg = error.statusText;
        });
  }

}
