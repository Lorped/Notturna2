import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthenticationService } from '../_services/index';
import { Router } from '@angular/router';

@Component({
    selector: 'app-registra',
    templateUrl: './registra.component.html',
    styleUrls: ['./registra.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class RegistraComponent  {


  accetta = '';
  hide = true;
  errmsg = '';

  registrationForm = new UntypedFormGroup ({
    regname: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(/^\S+$/),
      // ,
      // Validators.pattern('^[A-Za-zàèìòù \']+$')
    ] , [
      this.validateNomeNotTaken.bind(this)
    ]),

    regemail: new UntypedFormControl('', [
      Validators.required,
      Validators.email
    ], [
      this.validateEmailNotTaken.bind(this)
    ]),

    password: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(8)
      // ,
      // Validators.pattern('^.*((\\d.*[a-zA-Z])|([a-zA-Z].*\\d)).*$')
    ]),

    password2: new UntypedFormControl('', [
      Validators.required
    ]),

    check: new UntypedFormControl('', [
      Validators.required
    ])
  });

  private authenticationservice = inject(AuthenticationService);
  private router = inject(Router);



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
    return this.authenticationservice.checkEmail(control.value);
  }

  validateNomeNotTaken(control: AbstractControl) {
    return this.authenticationservice.checkNome(control.value);
  }

  doRegister() {
    this.errmsg = '';
    this.authenticationservice.sendregistra(this.regname!.value , this.password!.value, this.regemail!.value)
    .subscribe( () => {
      this.router.navigate(['']);
      },
        () => {
        this.errmsg = 'Errore di registrazione';
      }
    );
  }

}
