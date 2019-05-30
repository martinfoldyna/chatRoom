import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AuthService} from '../../auth/auth.service';
import {IUserResponse} from '../../../helpers/models/user.interface';
import {UserService} from '../../../helpers/services/user.service';
import {NotificationsService} from 'angular2-notifications';
import {forEach} from '@angular/router/src/utils/collection';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';

@Component({
  selector: 'app-add-friend-dialog',
  templateUrl: './add-friend-dialog.component.html',
  styleUrls: ['./add-friend-dialog.component.scss']
})
export class AddFriendDialogComponent implements OnInit {

  public form: FormGroup;
  public users: [IUserResponse];
  public reducedUsers: any[];
  public filteredUsers: Observable<IUserResponse[]>;
  public usersCtrl = new FormControl();
  public currentUser: IUserResponse;
  private selectedUser: string;
  private selectedValue: string;

  constructor(
    public authSvc: AuthService,
    public userSvc: UserService,
    public notificationSvc: NotificationsService,
    public dialogRef: MatDialogRef<AddFriendDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.allUsers();


  }

  ngOnInit() {

    this.allUsers();

  }

  private _filterUsers(value: string): IUserResponse[] {
    const filterValue = value.toLowerCase();
    console.log('value:', filterValue)


    return this.reducedUsers.filter(user => user.username.toLowerCase().indexOf(filterValue) === 0);
  }

  allUsers() {
    this.authSvc.getAllUsers().subscribe(res => {
      this.users = res.output;

      //Currently signed in user
      this.currentUser = res.currentUser;

      // Delte current user from all users (potential friends)
      this.reducedUsers = this.users.reduce((reducedUsers, item) => {
        // variable with the one user from all users array
        let user = item._id.toString();

        if (this.currentUser._id !== user) {

          reducedUsers.push(item);

          // Delete current's user friends from allUsersArray
          const currentUserFriends = this.currentUser.friends;
          currentUserFriends.forEach(friend => {
            console.log(friend);
            const pos = reducedUsers.map(function(e) { return e._id; }).indexOf(friend._id);
            if (pos > -1) {
              reducedUsers.splice(pos);
              console.log(reducedUsers);
            }
          })
          console.log(reducedUsers);

          // console.log('pushed');
        }
        return reducedUsers;
      }, [])

      // console.log('reducedUsers:', this.reducedUsers);

      this.filteredUsers = this.usersCtrl.valueChanges
        .pipe(
          startWith(''),
          map(user => user ? this._filterUsers(user) : this.reducedUsers.slice())
        );
    });
  }

  onChange(event) {
    console.log('event:', event);
    this.selectedUser = event;
  }

  addFriend() {
    if (this.selectedUser) {
      this.authSvc.addFriendRequest(this.selectedUser).subscribe(res => {
        if (res.code.success) {
          this.dialogRef.close();
          this.notificationSvc.success('Congratulations!', res.code.message);

        }
      });
    }
  }

  public valueMapper = (user) => {
    // const selection = this.users.find(e => e._id === key);
    //     // if (selection) { return selection.name; }
    if(user) { return user.username; }
  }



}
