import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {UserService} from '../../../helpers/services/user.service';
import {RoomsService} from '../../rooms/rooms.service';
import {Router} from '@angular/router';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {


  constructor(
    public authSvc: AuthService,
    public userSvc: UserService,
    public roomSvc: RoomsService,
    public router: Router,
    private notificationSvc: NotificationsService,

  ) {
    this.user = this.userSvc.getUserInfo();
  }

  //public activeUsers = this.roomSvc.getCurrentRoom().activeUsers.users;
  public user: any;
  public room = this.userSvc.getCurrentRoom();

  ngOnInit() {
    // console.log(this.activeUsers);


  }

  leaveRoom() {
    this.roomSvc.leaveRoom(this.room).subscribe(response => {
      if (response.code.success) {
        sessionStorage.removeItem('currentRoom');
        this.router.navigate(['/pages/dash']);
      }
    }, err => {
      console.log(err);
    });
  }

  logOut() {
    this.authSvc.logOut().subscribe(res => {
      this.notificationSvc.error(res.code.name, res.code.message);
      sessionStorage.removeItem('user');
      this.router.navigateByUrl('/auth');
    }, err => {
      console.log(err);
    });
  }





}
