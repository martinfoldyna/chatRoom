import {Component} from '@angular/core';
import {SocketService} from '../helpers/services/socket.service';

@Component({
  selector: 'app-pages',
  template: `
    <router-outlet></router-outlet>
  `,
})

export class PagesComponent {
  constructor(
    private socketSvc: SocketService
  ) {
  }
}
