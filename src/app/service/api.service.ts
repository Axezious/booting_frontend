import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {} from 'rxjs';
import { AuthService } from '../service/auth.service'
import { Users } from '../model/users';
import { Accounts } from '../model/accounts';
import { Priorities } from '../model/priorities';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly base_url = 'http://147.139.130.49:8080'
  //readonly base_url = 'http://localhost:8080'

  constructor(private http: HttpClient, private authService: AuthService) { }

  async getToken(user: Accounts) {
    return await this.http.post<any>(`${this.base_url}/api/login`,
    user).toPromise()
  }

  viewPriorities() :Observable<Priorities[]> {
    return this.http.get<Priorities[]>(`${this.base_url}/priorities/all`,
      { headers : {Authorization : `Bearer ${this.authService.getToken()}`} })
  }

  insertPriorities(data: Priorities) {
    return this.http.post<Priorities>(`${this.base_url}/priorities/insert`,data,
      { headers : {Authorization : `Bearer ${this.authService.getToken()}`} })
  }
  
}
