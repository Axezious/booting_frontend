import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {} from 'rxjs';
import { AuthService } from '../service/auth.service'
import { Users } from '../model/users';
import { Accounts } from '../model/accounts';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly base_url = 'http://147.139.130.49:8080'

  constructor(private http: HttpClient, private authService: AuthService) { }

  async getToken(user: Accounts) {
    return await this.http.post<any>(`${this.base_url}/api/login`,
    user).toPromise()
  }

  
}
