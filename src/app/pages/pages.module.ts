import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PagesComponent} from './pages.component';
import {PagesRouting} from './pages.routing.module';
import {MaterialModule} from '../helpers/modules/angular-material.module';
import {MessengerComponent} from './messenger/messenger.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserModule} from './user/user.module';
import {RoomsComponent} from './rooms/rooms.component';
import {CreateRoomDialogComponent} from './rooms/createRoomDialog/create-room-dialog.component';
import {SidenavComponent} from './sidenav/sidenav.component';
import {SocketService} from '../helpers/services/socket.service';
import {UserService} from '../helpers/services/user.service';
import {DashboardComponent} from './dashboard/dashboard.component';

@NgModule({
  imports: [
    PagesRouting,
    MaterialModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    UserModule
  ],
  declarations: [
    PagesComponent,
    MessengerComponent,
    RoomsComponent,
    CreateRoomDialogComponent,
    SidenavComponent,
    DashboardComponent

  ],
  entryComponents: [CreateRoomDialogComponent],
  providers: [SocketService, UserService]
})
export class PagesModule { }
