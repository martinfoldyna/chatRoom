import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {ILoginResponse} from '../../../helpers/models/loginResponse.interface';

@Injectable({
  providedIn: 'root'
})

export class RegisterService {
  constructor(public http: HttpClient) {}

  registerRequest(credentials): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>('http://localhost:5000/api/auth/registration', credentials);
  }
}
