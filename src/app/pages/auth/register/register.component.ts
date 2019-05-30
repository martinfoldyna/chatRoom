import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {RegisterService} from './register.service';
import {AuthService} from '../auth.service';
import {NotificationsService} from 'angular2-notifications';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public form: FormGroup;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  constructor(
    public authSvc: AuthService,
    private notificationsSvc: NotificationsService,
    private router: Router
  ) {
    this.form = new FormGroup({
      firstname: new FormControl(null, [Validators.required]),
      surname: new FormControl(null, [Validators.required]),
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      confirmpassword: new FormControl(null, [Validators.required]),
    });
  }

  get firstname() { return this.form.get('firstname'); }
  get surname() { return this.form.get('surname'); }
  get username() { return this.form.get('username'); }
  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
  get confirmpassword() { return this.form.get('confirmpassword'); }


  ngOnInit() {
  }

  onSubmit(input) {
    if (!this.form.valid) {
      this.firstname.markAsTouched();
      this.surname.markAsTouched();
      this.username.markAsTouched();
      this.email.markAsTouched();
      this.password.markAsTouched();
      this.confirmpassword.markAsTouched();
    } else {
        this.callRegisterSvc(input);
    }
  }

  callRegisterSvc(input) {
    this.authSvc.registerRequest(input).subscribe(response => {


      if (response.code.success) {
        this.notificationsSvc.success(response.code.name, response.code.message);
        this.formGroupDirective.resetForm();
      } else {
          this.notificationsSvc.error('Whoops', 'Něco se pokazilo při registraci, zkuste to prosím znovu.');
      }

      }, err => {
        console.log(err);
        this.notificationsSvc.error('Error', err.error.code.message);
      });
  }
}
