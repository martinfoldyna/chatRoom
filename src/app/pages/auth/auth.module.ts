import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthComponent} from './auth.component';
import {LoginComponent} from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RegisterComponent} from './register/register.component';
import {MaterialModule} from '../../helpers/modules/angular-material.module';
import {AuthRouting} from './auth.routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    AuthRouting,
  ],
  declarations: [AuthComponent, LoginComponent, RegisterComponent],
})
export class AuthModule { }
