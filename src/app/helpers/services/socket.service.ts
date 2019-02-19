import * as io from 'socket.io-client';
import {Observable} from 'rxjs';

export class SocketService {
  private url = 'http://localhost:5000';
  private socket;

  constructor() {
    this.socket = io(this.url);
  }

  joinRoom(room) {
    this.socket.emit('userJoinRoom', room);
    sessionStorage.setItem('connectedToRoom', room);
  }

  receivedSuccess() {
    const observable = new Observable((observer) => {
      this.socket.on('callSucceed', (data) => {
        observer.next(data);
      });
    });

    return observable;
  }

  receivedMessage() {
    const observable = new Observable((observer) => {
      this.socket.on('newMessage', (data) => {
        observer.next(data);
      });
    });

    return observable;

  }

  receivedConnectedToRoom() {
      const observable = new Observable(observer => {
        this.socket.on('Room joined', (data) => {
          observer.next(data);
        });
      });

      return observable;
    }
}
