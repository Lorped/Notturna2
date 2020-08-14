import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthenticationService } from '../services/index';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-registra',
  templateUrl: './registra.component.html',
  styleUrls: ['./registra.component.css']
})
export class RegistraComponent implements OnInit {


  accetta = '';
  hide = true;
  errmsg = '';

  registrationForm = new FormGroup ({
    regname: new FormControl('', [
      Validators.required
      //,
      //Validators.pattern('^[A-Za-zàèìòù \']+$')
    ] , [
      this.validateNomeNotTaken.bind(this)
    ]),

    regemail: new FormControl('', [
      Validators.required,
      Validators.email
    ], [
      this.validateEmailNotTaken.bind(this)
    ]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
      //,
      // Validators.pattern('^.*((\\d.*[a-zA-Z])|([a-zA-Z].*\\d)).*$')
    ]),

    password2: new FormControl('', [
      Validators.required
    ]),

    check: new FormControl('', [
      Validators.required
    ])
  });

  constructor( private authenticationservice: AuthenticationService , private router: Router) { }

  ngOnInit(): void {

  }

  get regname() {
    return this.registrationForm.get('regname');
  }
  get regemail() {
    return this.registrationForm.get('regemail');
  }
  get password() {
    return this.registrationForm.get('password');
  }
  get password2() {
    return this.registrationForm.get('password2');
  }
  get check() {
    return this.registrationForm.get('check');
  }

  validateEmailNotTaken(control: AbstractControl) {
  return this.authenticationservice.checkEmail(control.value)
  .pipe (  map ( (res: any) => {
    console.log(res);
     return  res == 'OK' ?  { emailTaken: true } : null ;
    // return null ;
  }));
  }

  validateNomeNotTaken(control: AbstractControl) {
  return this.authenticationservice.checkNome(control.value)
  .pipe (  map ( (res: any) => {
    console.log(res);
     return  res == 'OK' ?  { nomeTaken: true } : null ;
    // return null ;
  }));
  }

  doRegister() {
    this.errmsg = '';
    this.authenticationservice.sendregistra(this.regname!.value , this.password!.value, this.regemail!.value)
    .subscribe( res => {
      this.router.navigate(['']);
      },
        error => {
        this.errmsg = "Errore di registrazione";
      }
    );
  }

}
