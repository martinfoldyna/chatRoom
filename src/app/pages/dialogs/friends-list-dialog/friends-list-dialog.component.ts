import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {IUserResponse} from '../../../helpers/models/user.interface';

@Component({
  selector: 'app-friends-list-dialog',
  templateUrl: './friends-list-dialog.component.html',
  styleUrls: ['./friends-list-dialog.component.css']
})
export class FriendsListDialogComponent implements OnInit {

  public allUsers: [IUserResponse];
  constructor(
    private authSvc: AuthService,
  ) {
    this.authSvc.getAllUsers().subscribe(response => {
      this.allUsers = response.output;
    });
  }

  ngOnInit() {
  }

}
