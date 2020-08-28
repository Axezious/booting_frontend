import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router'
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class ActivateService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }
  canActivate(): boolean {
    if(this.auth.isAuthenticate()) {
      return true;
    } else {
      // this.router.navigateByUrl('/user-pages/login')
      // return false;
      return true;
    }
  }
}
