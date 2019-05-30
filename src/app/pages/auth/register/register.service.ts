import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {ILoginResponse} from '../../../helpers/models/loginResponse.interface';

@Injectable({
  providedIn: 'root'
})

export class RegisterService {
  constructor(public http: HttpClient) {}


}
