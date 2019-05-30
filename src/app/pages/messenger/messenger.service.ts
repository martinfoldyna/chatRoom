import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IResponseWithOutput} from '../../helpers/models/responseWithOutput.interface';
import {RoomsService} from '../rooms/rooms.service';

@Injectable({
  providedIn: 'root'
})

export class MessengerService {
  constructor(
    private http: HttpClient,
    private roomSvc: RoomsService
  ) {}

  getAllMessages(): Observable<IResponseWithOutput> {
    const currentRoom = this.roomSvc.getCurrentRoom();
    return this.http.get<IResponseWithOutput>(`http://localhost:5000/api/messages/${currentRoom._id}`);
  }
}
