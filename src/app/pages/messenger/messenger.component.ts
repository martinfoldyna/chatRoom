import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {RoomsService} from '../rooms/rooms.service';
import {Router} from '@angular/router';
import {MessengerService} from './messenger.service';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})

export class MessengerComponent implements OnInit {

  public currentRoom = JSON.parse(sessionStorage.getItem('currentRoom'));
  public messagesArr = [];

  constructor(
    private roomSvc: RoomsService,
    private router: Router,
    private authSvc: AuthService,
    private messengerSvc: MessengerService,
  ) {
    this.messengerSvc.getAllMessages().subscribe(response => {
      this.messagesArr = response.output;
    }, err => {
      console.log(err);
    });
  }


  ngOnInit() {
  }

  sendMessage(input) {
    const sendBody = {
      message: input,
      room: this.roomSvc.getCurrentRoom()._id,
      from: JSON.parse(sessionStorage.getItem('user'))._id
    };
    this.messengerSvc.sendMessage(sendBody).subscribe(response => {
      console.log(response);
      this.messengerSvc.getAllMessages().subscribe(response => {
        this.messagesArr = response.output;
      }, err => {
        console.log(err);
      });
    }, err => {
      console.log(err);
    });
  }

  leaveRoom() {
    this.roomSvc.leaveRoom(this.currentRoom).subscribe(response => {
      if (response.code.success) {
        sessionStorage.removeItem('currentRoom');
        this.router.navigate(['/pages/dash']);
      }
    }, err => {
      console.log(err);
    });
  }
}
