import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-auth',
  template: `
    <div class="wrapper mat-app-background">
    <div class="sideline"></div>
    <div class="container">
      <div class="row">
        <div class="col-6 align-self-center card-container">
            <mat-card>
              <mat-tab-group  color="primary">
                <mat-tab label="Přihlášení">
                  <app-login></app-login>
                </mat-tab>
                <mat-tab label="Registrace">
                  <app-register></app-register>
                </mat-tab>
              </mat-tab-group>
            </mat-card>
        </div>
      </div>
    </div>
    </div>

  `,
  styleUrls: ['auth.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AuthComponent {
  constructor() {
    if (sessionStorage.getItem('user')) {
      sessionStorage.removeItem('user');
    }
  }

}
