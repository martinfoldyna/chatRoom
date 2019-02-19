import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from './login.service';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public form: FormGroup;


  constructor(
    private loginService: LoginService,
    private router: Router,
    private authService: AuthService,
  ) {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  get username() { return this.form.get('username'); }
  get password() { return this.form.get('password'); }

  ngOnInit() {

  }

  onSubmit(input) {
    console.log(this.form);

    if (!this.form.valid) {
      this.username.markAsTouched();
      this.password.markAsTouched();
    } else {
      this.callLoginSvc(input);
    }
  }

  callLoginSvc(input) {
    this.loginService.logInRequest(input).subscribe((response) => {
      console.log(response);
      if (response.code.success) {
        this.authService.storeUserData(response.user, response.token);
        this.router.navigateByUrl('/pages/dash');
      } else {
        console.log('error');
      }
    }, (err) => {
      console.log(err);
    })
  }
}
