import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UntypedFormControl, UntypedFormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthenticationService } from '../_services/index';

@Component({
    selector: 'app-utente',
    templateUrl: './utente.component.html',
    styleUrls: ['./utente.component.css'],
    standalone: false
})
export class UtenteComponent implements OnInit {

  hide = true;

  emailForm = new UntypedFormGroup ({
    newemail: new UntypedFormControl('', [
      Validators.required,
      Validators.email
    ], [
      this.validateEmailNotTaken.bind(this)
    ]),
  });

  pwdForm = new UntypedFormGroup ({
    password: new UntypedFormControl('', [
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

  private authenticationservice = inject(AuthenticationService);
  private cdr = inject(ChangeDetectorRef);

  constructor() {
    this.emailForm.statusChanges.pipe(takeUntilDestroyed()).subscribe(() => this.cdr.markForCheck());
    this.pwdForm.statusChanges.pipe(takeUntilDestroyed()).subscribe(() => this.cdr.markForCheck());
  }


  ngOnInit(): void {
    this.emailForm.patchValue({ newemail: '' });
    this.pwdForm.patchValue({ password: '' });
  }

  changepwd(){
    const idutente = Number( sessionStorage.getItem('NotturnaUser') );
    this.authenticationservice.changepwd(idutente , this.password!.value , '').subscribe(
      () => {
        this.pwdForm.reset();
        this.cdr.markForCheck();
      }
    );
  }
  changeemail(){
    const idutente = Number( sessionStorage.getItem('NotturnaUser') );
    this.authenticationservice.changepwd(idutente , '', this.newemail!.value ).subscribe(
      () => {
        this.emailForm.reset();
        this.cdr.markForCheck();
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
    return this.authenticationservice.checkEmail(control.value);
  }

}
