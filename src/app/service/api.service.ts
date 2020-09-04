import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { } from 'rxjs';
import { AuthService } from '../service/auth.service'
import { Users } from '../model/users';
import { Accounts } from '../model/accounts';
import { Priorities } from '../model/priorities';
import { Roles } from '../model/roles';
import { Companies } from '../model/companies';
import { Products } from '../model/products';
import { Classifications } from '../model/classifications';
import { auth, User } from 'firebase';
import { TicketsDtl } from '../model/tickets-dtl';
import { Status } from '../model/status';
import { TicketStatus } from '../model/ticket-status';
import { TicketChart } from '../model/ticket-chart';
import { Tickets } from '../model/tickets';
import { data } from 'jquery';

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


  //CRUD Classifications
  viewClassifications(): Observable<Classifications[]> {
    return this.http.get<Classifications[]>(`${this.base_url}/classifications/all`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  insertClassifications(data: Classifications): Observable<Classifications> {
    return this.http.post<Classifications>(`${this.base_url}/classifications/insert`, data,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  deleteClassifications(classification: Classifications) {
    return this.http.delete<Classifications>(`${this.base_url}/classifications/delete/${classification.id}`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  updateClassifications(data: Classifications): Observable<Classifications> {
    return this.http.put<Classifications>(`${this.base_url}/classifications/update`, data,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }


  //CRUD Companies
  viewCompanies(): Observable<Companies[]> {
    return this.http.get<Companies[]>(`${this.base_url}/companies/all-active`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  insertCompanies(data: Companies): Observable<Companies> {
    return this.http.post<Companies>(`${this.base_url}/companies/insert`, data,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  deleteCompanies(company: Companies) {
    return this.http.delete<Companies>(`${this.base_url}/companies/delete/${company.id}`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  updateCompanies(data: Companies): Observable<Companies> {
    return this.http.put<Companies>(`${this.base_url}/companies/update`, data,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }


  //CRUD Priorities
  viewPriorities(): Observable<Priorities[]> {
    return this.http.get<Priorities[]>(`${this.base_url}/priorities/all`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  insertPriorities(data: Priorities): Observable<Priorities> {
    return this.http.post<Priorities>(`${this.base_url}/priorities/insert`, data,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  deletePriorities(priority: Priorities) {
    return this.http.delete<Priorities>(`${this.base_url}/priorities/delete/${priority.id}`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  updatePriorities(data: Priorities): Observable<Priorities> {
    return this.http.put<Priorities>(`${this.base_url}/priorities/update`, data,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }


  //CRUD Products
  viewProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(`${this.base_url}/products/all`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  insertProducts(data: Products): Observable<Products> {
    return this.http.post<Products>(`${this.base_url}/products/insert`, data,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  deleteProducts(product: Products) {
    return this.http.delete<Products>(`${this.base_url}/products/delete/${product.id}`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  updateProducts(data: Products): Observable<Products> {
    return this.http.put<Products>(`${this.base_url}/products/update`, data,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  //CRUD Roles
  viewRoles(): Observable<Roles[]> {
    return this.http.get<Roles[]>(`${this.base_url}/roles/all`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  insertRoles(data: Roles): Observable<Roles> {
    return this.http.post<Roles>(`${this.base_url}/roles/insert`, data,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  deleteRoles(role: Roles) {
    return this.http.delete<Roles>(`${this.base_url}/roles/delete/${role.id}`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  updateRoles(data: Roles): Observable<Roles> {
    return this.http.put<Roles>(`${this.base_url}/roles/update`, data,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }


  //CRUD Status
  viewStatus(): Observable<Status[]> {
    return this.http.get<Status[]>(`${this.base_url}/status/all`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  insertStatus(data: Status): Observable<Status> {
    return this.http.post<Status>(`${this.base_url}/status/insert`, data,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  deleteStatus(status: Status) {
    return this.http.delete<Status>(`${this.base_url}/status/delete/${status.id}`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  updateStatus(data: Status): Observable<Status> {
    return this.http.put<Status>(`${this.base_url}/status/update`, data,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  //CRUD Users
  viewUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.base_url}/users/all`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  insertUsers(data: Users): Observable<Users> {
    return this.http.post<Users>(`${this.base_url}/users/insert`, data,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  deleteUsers(user: Users) {
    return this.http.delete<Users>(`${this.base_url}/users/delete/${user.id}`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  updateUsers(data: Companies): Observable<Users> {
    return this.http.put<Users>(`${this.base_url}/users/update`, data,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  getUserByNip(nip: string): Observable<Users> {
    return this.http.get<Users>(`${this.base_url}/users/get-users/${nip}`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  //Crud dashboard Admin
  dashboardAdmin(): Observable<TicketStatus> {
    return this.http.get<TicketStatus>(`${this.base_url}/tickets/all-status`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }
  //Crud dashboard Client
  dashboardClient(data: string): Observable<Tickets[]> {
    return this.http.get<Tickets[]>(`${this.base_url}/tickets/all-company/${data}`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }
  //Crud dashboard Agent
  dashboardAgent(data: string): Observable<Tickets[]> {
    return this.http.get<Tickets[]>(`${this.base_url}/tickets/all-agent/${data}`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }
  //Crud dashboard Customer
  dashboardCustomer(data: string): Observable<Tickets[]> {
    return this.http.get<Tickets[]>(`${this.base_url}/tickets/all-customer/${data}`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }
  //CRUD dashboardRecentAdmin
  recentAdmin(): Observable<Tickets[]> {
    return this.http.get<Tickets[]>(`${this.base_url}/tickets/all`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  // CRUD TICKET
  insertTicket(data: Tickets): Observable<Tickets> {
    return this.http.post<Tickets>(`${this.base_url}/tickets/insert`, data,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  getListTicket(): Observable<Tickets[]> {
    return this.http.get<Tickets[]>(`${this.base_url}/tickets/all`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  // CRUD ACCOUNT
  insertAccount(data: Accounts): Observable<Accounts> {
    return this.http.post<Accounts>(`${this.base_url}/accounts/insert`, data,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  getChart(data: string): Observable<TicketChart[]> {
    return this.http.get<TicketChart[]>(`${this.base_url}/tickets/charts/${data}`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  getChartClient(data: {}): Observable<TicketChart[]> {
    return this.http.get<TicketChart[]>(`${this.base_url}/tickets/charts/${data}`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

}

