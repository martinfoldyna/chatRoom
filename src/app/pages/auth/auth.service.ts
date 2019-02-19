import {IUser} from '../../helpers/models/user.interface';
import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient) {}

  logOut() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    console.log(user);
    this.http.post('http://localhost:5000/api/auth/logout', user).subscribe(res => {
        console.log(res);
        sessionStorage.removeItem('user');
        window.location.reload();
      }, err => {
        console.log(err);
    });
  }

  storeUserData(user: IUser, token: string) {
    user.token = token;
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

  checkActivity() {
    const requestBody = {room: 'testRoom'};
    return this.http.post('http://localhost:5000/api/auth/checkActivity', requestBody);
  }
}
