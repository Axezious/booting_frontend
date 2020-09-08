import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminPermitService implements CanActivate{

  constructor(private auth: AuthService, private router: Router) { }
  canActivate() : boolean {
    if(this.auth.adminPermit()) {
      return true
    } else {
      this.router.navigateByUrl('/dashboard')
      return false;
    }
  }

}
