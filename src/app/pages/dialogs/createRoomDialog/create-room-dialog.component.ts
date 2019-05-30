import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RoomsService} from '../../rooms/rooms.service';
import {SocketService} from '../../../helpers/services/socket.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-room-dialog',
  templateUrl: './create-room-dialog.component.html',
  styleUrls: ['./create-room-dialog.component.css']
})
export class CreateRoomDialogComponent implements OnInit {

  public form: FormGroup;

  constructor(
    public socketSvc: SocketService,
    public roomSvc: RoomsService,
    public router: Router,
    public dialogRef: MatDialogRef<CreateRoomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
    });
  }

  get name() { return this.form.get('name'); }

  ngOnInit() {
  }

  save(input) {
    this.roomSvc.createRoom(input).subscribe(response => {
      if (response.code.success) {
        this.dialogRef.close(this.form.value);
        window.location.reload();
      }
    });

    // this.socketSvc.createRoom(input);
    // this.dialogRef.close(this.form.value);

  }

}
