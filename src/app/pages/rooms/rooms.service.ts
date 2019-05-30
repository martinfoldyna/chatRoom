import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IResponseWithOutput} from '../../helpers/models/responseWithOutput.interface';

@Injectable({
  providedIn: 'root'
})

export class RoomsService {
  constructor(
    private http: HttpClient
  ) {}

  createRoom(input): Observable<IResponseWithOutput> {
    return this.http.post<IResponseWithOutput>('http://localhost:5000/api/room', input);
  }

  getAllRooms(paramValue?): Observable<IResponseWithOutput> {
    const params = new HttpParams().set('format', paramValue);
    return this.http.get<IResponseWithOutput>('http://localhost:5000/api/room/all', {params: params});
  }

  getActiveUsers(): Observable<IResponseWithOutput> {
    const currentRoomId = this.getCurrentRoom()._id;
    return this.http.get<IResponseWithOutput>(`http://localhost:5000/api/room/${currentRoomId}`);
  }

  joinRoom(room): Observable<IResponseWithOutput> {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return this.http.post<IResponseWithOutput>(`http://localhost:5000/api/room/join/${room._id}`, user);
  }

  leaveRoom(room): Observable<IResponseWithOutput> {
    console.log(room);
    return this.http.post<IResponseWithOutput>(`http://localhost:5000/api/room/leave/${room._id}`, JSON.parse(sessionStorage.getItem('user')));
  }

  getCurrentRoom() {
    return JSON.parse(sessionStorage.getItem('currentRoom'));
  }

  deleteRoom(room): Observable<IResponseWithOutput> {
    return this.http.post<IResponseWithOutput>(`http://localhost:5000/api/room/delete/${room._id}`, {});
  }

  getUser() {
    return this.http.get('http://localhost:5000/api/auth/user');
  }
}
