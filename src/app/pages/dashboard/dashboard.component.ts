import {Component, OnInit} from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {RoomsService} from '../rooms/rooms.service';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {UserService} from '../../helpers/services/user.service';
import {CreateRoomDialogComponent} from '../dialogs/createRoomDialog/create-room-dialog.component';
import {MatDialog} from '@angular/material';
import {SocketService} from '../../helpers/services/socket.service';
import {RoomDetailDialogComponent} from '../dialogs/room-detail-dialog/room-detail-dialog.component';
import {AddFriendDialogComponent} from '../dialogs/add-friend-dialog/add-friend-dialog.component';
import {NotificationsService} from 'angular2-notifications';
import {promise} from 'selenium-webdriver';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private breakpointObserver: BreakpointObserver,
    private roomSvc: RoomsService,
    private authSvc: AuthService,
    private userSvc: UserService,
    private chatSvc: SocketService,
    private router: Router,
    private dialog: MatDialog,
    private notififcationSvc: NotificationsService
  ) {
    this.getAllFriends();
  }

  roomsLoaded: Promise<boolean>;
  friendsLoaded: Promise<boolean>
  public rooms = [];
  public roomsArray = [];
  public friendsArray = [];



  ngOnInit() {
    this.loadRooms();
    this.getAllFriends();
    this.roomSvc.getUser().subscribe(user => {
      console.log(user);
    })

  }

  loadRooms() {
    this.roomSvc.getAllRooms().subscribe(response => {
      if (response.code.success) {
        const rooms = response.output;
        console.log(rooms);
        this.rooms = rooms;

        this.roomsLoaded = Promise.resolve(true);
      } else {
        console.log('error');
      }
    });

    if (this.roomSvc.getCurrentRoom()) {
      this.router.navigate(['/pages/chat']);
    }
  }

  getAllFriends() {
    this.authSvc.getAllUsers().subscribe(response => {
      if (response.code.success) {
        this.friendsArray = response.currentUser.friends;
        console.log('friends:', this.friendsArray);

        this.friendsLoaded = Promise.resolve(true);
      }
    }, err => {
      this.notififcationSvc.error('Error', err);
    })
  }

  onJoinClick(room) {
    console.log(room);
    this.chatSvc.joinRoom(room);
    this.roomSvc.joinRoom(room).subscribe(res => {
      sessionStorage.setItem('currentRoom', JSON.stringify(res.output));
      this.router.navigate(['/pages/chat']);
    });
  }

  createRoomDialog() {
    const dialogRef = this.dialog.open(CreateRoomDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with value', result);

    });
  }

  addFriendDialog() {
    const dialogRef = this.dialog.open(AddFriendDialogComponent, {
      width: '80%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with value', result);
      this.router.navigateByUrl('/pages');


    });
  }

  friendsListDialog() {
    const dialogRef = this.dialog.open(CreateRoomDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with value', result);


    });
  }

  openRoomDialog(room) {
    const dialogRef = this.dialog.open(RoomDetailDialogComponent, {
      width: '250px',
      data: {
        room: room
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.boolean === true) {
        console.log('Wants to join: ', result);
        this.onJoinClick(result.room);
      } else if (result === false) {
        console.log('Wants to join: ', result);
      } else {
        console.log('error');
      }


    });
  }

  removeFriend(friendId: string) {
    this.authSvc.removeFriend(friendId).subscribe(response => {
      this.notififcationSvc.success(response.code.name, response.code.message);
    }, err => {
      this.notififcationSvc.error('Error', err);
    })
  }
}
