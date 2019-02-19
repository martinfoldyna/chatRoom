import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : false;

    const authReq = req.clone({
      headers: new HttpHeaders({
        'Authorization': token,
        'Content-Type': 'application/json',
        'Application-ID': '6e6f7274-6865-726e-7374-6172732e637a'
      })
    });
    console.log('Intercepted HTTP call', authReq);

    return next.handle(authReq);
  }
}
