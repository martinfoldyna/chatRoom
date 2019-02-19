import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DialogData} from '../rooms.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RoomsService} from '../rooms.service';

@Component({
  selector: 'app-create-room-dialog',
  templateUrl: './create-room-dialog.component.html',
  styleUrls: ['./create-room-dialog.component.css']
})
export class CreateRoomDialogComponent implements OnInit {

  public form: FormGroup;

  constructor(
    public roomSvc: RoomsService,
    public dialogRef: MatDialogRef<CreateRoomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
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
  }

}
