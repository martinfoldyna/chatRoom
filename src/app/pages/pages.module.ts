import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PagesComponent} from './pages.component';
import {PagesRouting} from './pages.routing.module';
import {MaterialModule} from '../helpers/modules/angular-material.module';
import {MessengerComponent} from './messenger/messenger.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserModule} from './user/user.module';
import {RoomsComponent} from './rooms/rooms.component';
import {CreateRoomDialogComponent} from './dialogs/createRoomDialog/create-room-dialog.component';
import {SocketService} from '../helpers/services/socket.service';
import {UserService} from '../helpers/services/user.service';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MomentModule} from 'angular2-moment';
import {RoomDetailDialogComponent} from './dialogs/room-detail-dialog/room-detail-dialog.component';
import {DashboardModule} from './dashboard/dashboard.module';
import {AddFriendDialogComponent} from './dialogs/add-friend-dialog/add-friend-dialog.component';
import {FriendsListDialogComponent} from './dialogs/friends-list-dialog/friends-list-dialog.component';
import {CipherService} from '../helpers/services/cipher.service';

@NgModule({
  imports: [
    PagesRouting,
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserModule,
    MomentModule,
    DashboardModule
  ],
  declarations: [
    PagesComponent,
    MessengerComponent,
    RoomsComponent,
    CreateRoomDialogComponent,
    RoomDetailDialogComponent,
    AddFriendDialogComponent,
    FriendsListDialogComponent
  ],
  entryComponents: [CreateRoomDialogComponent, RoomDetailDialogComponent, AddFriendDialogComponent, FriendsListDialogComponent],
  providers: [SocketService, UserService, CipherService]
})
export class PagesModule { }
