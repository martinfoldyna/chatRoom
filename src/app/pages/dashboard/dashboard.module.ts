import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {UserService} from '../../helpers/services/user.service';
import {TopBarComponent} from './top-bar/top-bar.component';
import {MaterialModule} from '../../helpers/modules/angular-material.module';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from './dashboard.routing.module';

@NgModule({
  declarations: [DashboardComponent, TopBarComponent],
  imports: [
    CommonModule,
    MaterialModule,
    DashboardRoutingModule
  ],
  providers: [
    UserService
  ]
})

export class DashboardModule {}
