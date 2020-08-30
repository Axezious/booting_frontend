import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {} from 'rxjs';
import { AuthService } from '../service/auth.service'

import { Users } from '../model/users';
import { Accounts } from '../model/accounts';
import { Priorities } from '../model/priorities';
import { Roles } from '../model/roles';
import { Companies } from '../model/companies';

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

  insertPriorities(data: Priorities) :Observable<Priorities>{
    return this.http.post<Priorities>(`${this.base_url}/priorities/insert`,data,
      { headers : {Authorization : `Bearer ${this.authService.getToken()}`} })
  }

  deletePriorities(priority:Priorities){
    return this.http.post<Priorities>(`${this.base_url}/priorities/delete`, priority,
      { headers : {Authorization : `Bearer ${this.authService.getToken()}`} })
  }

  viewRoles() :Observable<Roles[]> {
    return this.http.get<Roles[]>(`${this.base_url}/roles/all`,
      { headers : {Authorization : `Bearer ${this.authService.getToken()}`} })
  }

  insertRoles(data:Roles) :Observable<Roles> {
    return this.http.post<Roles>(`${this.base_url}/roles/insert`, data,
      { headers : {Authorization : `Bearer ${this.authService.getToken()}`} })
  }

  viewCompanies() :Observable<Companies[]> {
    return this.http.get<Companies[]>(`${this.base_url}/companies/all`,
      { headers : {Authorization : `Bearer ${this.authService.getToken()}`} })
  }

  insertCompanies(data:Companies) :Observable<Companies>{
    return this.http.post<Companies>(`${this.base_url}/companies/insert`, data,
      { headers : {Authorization : `Bearer ${this.authService.getToken()}`} })
  }

  viewUsers():Observable<Users[]> {
    return this.http.get<Users[]>(`${this.base_url}/users/all`,
      { headers : {Authorization : `Bearer ${this.authService.getToken()}`} })
  }

  insertUsers(data:Users):Observable<Users> {
    return this.http.post<Users>(`${this.base_url}/users/insert`, data,
      { headers : {Authorization : `Bearer ${this.authService.getToken()}`} })
  }

}

