import {Component} from '@angular/core';
import {SocketService} from '../helpers/services/socket.service';

@Component({
  selector: 'app-pages',
  template: `
    <app-sidenav></app-sidenav>
  `,
})

export class PagesComponent {
  constructor(
    private socketSvc: SocketService
  ) {
  }
}
