import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {CreateRoomDialogComponent} from '../dialogs/createRoomDialog/create-room-dialog.component';
import {RoomsService} from './rooms.service';
import {SocketService} from '../../helpers/services/socket.service';
import {UserService} from '../../helpers/services/user.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  public roomsArray = [];
  public messageArray = [];
  public rooms = [];

  constructor(
    public dialog: MatDialog,
    public roomSvc: RoomsService,
    public chatSvc: SocketService,
    public userSvc: UserService,
    public router: Router
  ) {
    this.chatSvc.receivedMessage().subscribe(data => {
      this.messageArray.push(data);
    });
  }

  roomsLoaded: Promise<boolean>;

  ngOnInit() {
      this.roomSvc.getAllRooms('username').subscribe(response => {
        if (response.code.success) {
          const rooms = response.output;
          console.log(rooms);
          this.rooms = rooms;

          this.roomsLoaded = Promise.resolve(true);
        } else {
          console.log('error');
        }
      });

  }

  showRooms() {
    return (this.roomsArray) && (this.userSvc.getCurrentRoom());
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateRoomDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with value', result);

      this.createRoom(result);
    });
  }

  createRoom(input) {
    this.roomSvc.createRoom(input).subscribe(response => {
      console.log(response);
    });
  }


  // joinRoom(room) {
  //
  //   this.roomSvc.joinRoom(room).subscribe(res => {
  //     this.chatSvc.joinRoom(room);
  //     sessionStorage.setItem('currentRoom', JSON.stringify(res.output));
  //     this.router.navigate(['/pages/chat']);
  //   })
  // }

  tileClicked(room) {
    console.log(room);
    this.roomSvc.joinRoom(room).subscribe(res => {
      this.chatSvc.joinRoom(room);
      this.chatSvc.joinRoom(room);
      sessionStorage.setItem('currentRoom', JSON.stringify(res.output));
      this.router.navigate(['/pages/chat']);
    });
  }
}

