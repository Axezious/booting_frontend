import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshProfileService {

  constructor() { }

  private profileService = new Subject<any>();
    profile = this.profileService.asObservable();

  callRefreshPhoto(){
    this.profileService.next();
  }
}
