import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../pages/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router
  ) {

  }

  canActivate(): boolean {
    if (!this.authService.isTokenValid()) {
      this.router.navigate(['/auth']);
      return false;
    } else {
      return true;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class DashGuard implements CanActivate {
  constructor(
    public router: Router
  ) {}

  canActivate(): boolean {
    return !!sessionStorage.getItem('currentRoom');
  }
}
