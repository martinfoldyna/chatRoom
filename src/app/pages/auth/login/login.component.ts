import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from './login.service';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {NotificationsService} from 'angular2-notifications';

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
    private notificationsSvc: NotificationsService
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
    if (!this.form.valid) {
      this.username.markAsTouched();
      this.password.markAsTouched();
    } else {
      this.callLoginSvc(input);
    }
  }

  callLoginSvc(input) {
    this.authService.logInRequest(input).subscribe((response) => {
      this.authService.storeUserData(response.user, response.token);
      console.log(response.code);
      if (response.code.success) {
        this.notificationsSvc.success(response.code.name, response.code.message);

        this.router.navigateByUrl('/pages/dash');

      } else {
        this.notificationsSvc.error('Whoops', 'Něco se pokazilo při přihlašování, zkuste to prosím znovu.');
      }
    }, (err) => {
      this.notificationsSvc.error('Error', err);
    });
  }

  checkForUserData() {
    this.authService.checkUserData().subscribe(user => {
      console.log(user);
    })
  }
}
