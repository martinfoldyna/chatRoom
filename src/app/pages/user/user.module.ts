import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './user-info/user-info.component';
import {UserRouting} from './user.routing.module';
import {UserComponent} from './user.component';

@NgModule({
  declarations: [UserInfoComponent, UserComponent],
  imports: [
    CommonModule,
    UserRouting
  ]
})
export class UserModule { }
