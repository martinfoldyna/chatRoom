import * as io from 'socket.io-client';
import {Observable} from 'rxjs';
import {UserService} from './user.service';
import {RoomsService} from '../../pages/rooms/rooms.service';

export class SocketService {
  private url = 'http://localhost:5000';
  private socket;

  constructor() {
    this.socket = io(this.url);
  }

  joinRoom(room) {
      const requestBody = {
        room: room,
        user: JSON.parse(sessionStorage.getItem('user'))
      };
      this.socket.emit('joinRoom', room);
  }

  receivedMessage() {
    return new Observable(observer => {

      this.socket.on('receivedMessage', (data) => {
        console.log('got-data');
        observer.next(data);
      })
    })
  }

  receivedAllMessages() {
    const observable = new Observable(observer => {
      this.socket.on('allMessagesLoaded', data => {
        observer.next(data);
      });
    });

    return observable;
  }

  sendMessage(message) {
    this.socket.emit('sendMessage', message);
  }

  leaveRoom(room) {
    this.socket.emit('leaveRoom', room);
  }
}
