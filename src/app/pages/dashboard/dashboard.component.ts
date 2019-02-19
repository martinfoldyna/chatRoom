import {Component, OnInit} from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {RoomsService} from '../rooms/rooms.service';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {UserService} from '../../helpers/services/user.service';
import {CreateRoomDialogComponent} from '../rooms/createRoomDialog/create-room-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  roomsLoaded: Promise<boolean>;
  public rooms = [];
  public roomsArray = [];
  public messageArray = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private roomSvc: RoomsService,
    private authSvc: AuthService,
    private userSvc: UserService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

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

    if (this.roomSvc.getCurrentRoom()) {
      this.router.navigate(['/pages/chat']);
    }
  }

  tileClicked(room) {
    console.log(room);
    this.roomSvc.joinRoom(room).subscribe(res => {
      sessionStorage.setItem('currentRoom', JSON.stringify(res.output));
      this.router.navigate(['/pages/chat']);
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


    });
  }

  createRoom(input) {
    this.roomSvc.createRoom(input).subscribe(response => {
      console.log(response);
    });
  }
}
