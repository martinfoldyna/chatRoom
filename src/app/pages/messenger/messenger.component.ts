import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {RoomsService} from '../rooms/rooms.service';
import {Router} from '@angular/router';
import {MessengerService} from './messenger.service';
import {AuthService} from '../auth/auth.service';
import {SocketService} from '../../helpers/services/socket.service';
import {CipherService} from '../../helpers/services/cipher.service';
import {UserService} from '../../helpers/services/user.service';


@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})

export class MessengerComponent implements OnInit {

  public currentRoom = JSON.parse(sessionStorage.getItem('currentRoom'));
  public messagesArr;

  constructor(
    private roomSvc: RoomsService,
    private router: Router,
    private authSvc: AuthService,
    private messengerSvc: MessengerService,
    private socketSvc: SocketService,
    private userSvc: UserService,
    private cipherSvc: CipherService
  ) {
    this.messengerSvc.getAllMessages().subscribe(response => {

      let encryptedMessages;
      encryptedMessages = response.output;
      for (let message of encryptedMessages) {
        this.cipherSvc.decrypt('testovacikod', message.message).then(decryptedMessage => {
          message.message = decryptedMessage;
        });
      }

      this.messagesArr = encryptedMessages;
      console.log(this.messagesArr);
    }, err => {
      console.log(err);
    });
  }

  public room = this.roomSvc.getCurrentRoom();

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.socketSvc.receivedMessage().subscribe((message) => {

      message["message"] = this.cipherSvc.decrypt('testovacikod', message["message"]).then(decryptedMessage => {
        message["message"] = decryptedMessage;
        console.log(message);
        this.messagesArr.push(message);
      });


    })
  }

  sendMessage(input) {
    const sendBody = {
      message: this.cipherSvc.encrypt('testovacikod', input),
      room: this.roomSvc.getCurrentRoom()._id,
      from: JSON.parse(sessionStorage.getItem('user'))
    };

    this.socketSvc.sendMessage(sendBody);
  }

  leaveRoom() {
    this.roomSvc.leaveRoom(this.currentRoom).subscribe(response => {
      this.socketSvc.leaveRoom(this.currentRoom);
      if (response.code.success) {
        sessionStorage.removeItem('currentRoom');
        this.router.navigate(['/pages/dash']);
      }
    }, err => {
      console.log(err);
    });
  }

  isItMine(message) {
    const currentUser = this.userSvc.getUserInfo();
    if (message.from._id === currentUser._id) {
      return true
    } else {
      return false;
    }
  }


}
