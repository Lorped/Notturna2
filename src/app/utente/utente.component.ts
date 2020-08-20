import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthenticationService } from '../services/index';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-utente',
  templateUrl: './utente.component.html',
  styleUrls: ['./utente.component.css']
})
export class UtenteComponent implements OnInit {

  hide = true;

  emailForm = new FormGroup ({
    newemail: new FormControl('', [
      Validators.required,
      Validators.email
    ], [
      this.validateEmailNotTaken.bind(this)
    ]),
  });

  pwdForm = new FormGroup ({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
      //,
      // Validators.pattern('^.*((\\d.*[a-zA-Z])|([a-zA-Z].*\\d)).*$')
    ]),
    /*
     password2: new FormControl('', [
      Validators.required
    ]),
    */
  });



  constructor(private authenticationservice: AuthenticationService) { }

  ngOnInit(): void {
    this.emailForm.patchValue({ newemail: '' });
    this.pwdForm.patchValue({ password: '' });
  }

  changepwd(){
    const idutente = Number( sessionStorage.getItem('NotturnaUser') );
    this.authenticationservice.changepwd(idutente , this.password!.value , '').subscribe(
      (data) => {
        this.pwdForm.reset();
      }
    );
  }
  changeemail(){
    const idutente = Number( sessionStorage.getItem('NotturnaUser') );
    this.authenticationservice.changepwd(idutente , '', this.newemail!.value ).subscribe(
      (data) => {
        this.emailForm.reset();
      }
    );
  }

  get newemail() {
    return this.emailForm.get('newemail');
  }
  get password() {
    return this.pwdForm.get('password');
  }

  validateEmailNotTaken(control: AbstractControl) {
  return this.authenticationservice.checkEmail(control.value)
  .pipe (  map ( (res: any) => {
    // console.log(res);
     return  res == 'OK' ?  { emailTaken: true } : null ;
    // return null ;
  }));
  }

}
