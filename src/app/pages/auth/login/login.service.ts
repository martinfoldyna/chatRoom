import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ILoginResponse} from '../../../helpers/models/loginResponse.interface';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  constructor(private http: HttpClient) {}

  logInRequest(credentials): Observable<ILoginResponse> {
    console.log(credentials);
    return this.http.post<ILoginResponse>('http://localhost:5000/api/auth/login', credentials);
  }
}
