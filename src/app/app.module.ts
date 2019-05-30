
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRouting} from './app.routing.module';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpInterceptor} from '@angular/common/http';
import {HttpHeadersInterceptor} from './helpers/services/http.interceptor';
import {SocketIoModule, SocketIoConfig} from 'ngx-socket-io';
import {MaterialModule} from './helpers/modules/angular-material.module';
import {UserService} from './helpers/services/user.service';
import {SimpleNotificationsModule} from 'angular2-notifications';

const config: SocketIoConfig = { url: 'http://localhost:5000', options: {} };

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRouting,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    SimpleNotificationsModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeadersInterceptor,
      multi: true
    },
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
