import {IUser} from '../../helpers/models/user.interface';
import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NotificationsService} from 'angular2-notifications';
import {Router} from '@angular/router';
import {IResponseWithOutput, IResponseGetAllUsers} from '../../helpers/models/responseWithOutput.interface';
import {UserService} from '../../helpers/services/user.service';
import {ILoginResponse} from '../../helpers/models/loginResponse.interface';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(
    private http: HttpClient,
  ) {}

  registerRequest(credentials): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>('http://localhost:5000/api/auth/registration', credentials);
  }

  logInRequest(credentials): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>('http://localhost:5000/api/auth/login', credentials);
  }

  checkUserData() {
    return this.http.get('http://localhost:5000/api/auth/user');
  }

  logOut():Observable<IResponseWithOutput> {
    return this.http.post<IResponseWithOutput>('http://localhost:5000/api/auth/logout', {})
  }

  getAllUsers(): Observable<IResponseGetAllUsers> {
    return this.http.get<IResponseGetAllUsers>('http://localhost:5000/api/auth/users');
  }

  storeUserData(user: IUser, token: string) {
    user.token = token;
    console.log(token);
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  loadToken() {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user).token : false;
  }

  isTokenValid() {
    const token = this.loadToken();
    return token ? !new JwtHelperService().isTokenExpired(token) : false;
  }

  addFriendRequest(user): Observable<IResponseWithOutput> {
    return this.http.post<IResponseWithOutput>(`http://localhost:5000/api/auth/addFriend/${user._id}`, {user: user});
  }

  removeFriend(friendId: string): Observable<IResponseWithOutput> {
    return this.http.delete<IResponseWithOutput>(`http://localhost:5000/api/auth/friend/${friendId}`);
  }
}
