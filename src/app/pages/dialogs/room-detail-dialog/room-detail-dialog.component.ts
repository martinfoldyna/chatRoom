import {Component, Inject, OnInit} from '@angular/core';
import {RoomsService} from '../../rooms/rooms.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {IUser} from '../../../helpers/models/user.interface';
import {IRoom} from '../../../helpers/models/room.interface';
import {NotificationsService} from 'angular2-notifications';


export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-room-detail-dialog',
  templateUrl: './room-detail-dialog.component.html',
  styleUrls: ['./room-detail-dialog.component.css']
})
export class RoomDetailDialogComponent implements OnInit {

  constructor(
    public roomSvc: RoomsService,
    public notificationSvc: NotificationsService,
    public dialogRef: MatDialogRef<RoomDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IRoom
  ) { }

  // TODO: add interface for output
  public room = this.data['room'];

  ngOnInit() {
    console.log(this.room);
  }

  actionButtonClicked(boolean) {
    const closeData = {
      boolean: boolean,
      room: this.room
    };
    this.dialogRef.close(closeData);
  }

  deleteRoom() {
    this.roomSvc.deleteRoom(this.room).subscribe(response => {
      console.log(response);
      if (response.code.success) {
        sessionStorage.removeItem('currentRoom');
        this.notificationSvc.success(response.code.name, response.code.message);
        this.dialogRef.close();
        window.location.reload();
      }
    }, err => {
      this.notificationSvc.error('error', err.error);
    });
  }

}
