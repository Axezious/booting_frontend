import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
import { TicketHeader } from '../model/ticket-header';
import { Status } from '../model/status';
import { TicketStatus } from '../model/ticket-status';
import { TicketChart } from '../model/ticket-chart';
import { Tickets } from '../model/tickets';
import { data } from 'jquery';
import { saveAs } from "file-saver"
import { AgentRelations } from '../model/agent-relations';
import { ClientProducts } from '../model/client-products';
import { AgentModal } from '../model/agent-modal';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly base_url = 'http://147.139.130.49:8080'
  readonly base_url2 = 'http://052a843eb7a1.ngrok.io'
  // readonly base_url = 'http://localhost:8080'

  constructor(private http: HttpClient, private authService: AuthService) { }

  async getToken(user: Accounts) {
    return await this.http.post<any>(`${this.base_url}/api/login`,
      user).toPromise()
  }


  //CRUD Classifications
  viewClassifications(): Observable<Classifications[]> {
    return this.http.get<Classifications[]>(`${this.base_url}/classifications/`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  insertClassifications(data: Classifications): Observable<Classifications> {
    return this.http.post<Classifications>(`${this.base_url}/classifications/`, data,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  deleteClassifications(classification: Classifications) {
    return this.http.delete<Classifications>(`${this.base_url}/classifications/${classification.id}`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  updateClassifications(data: Classifications): Observable<Classifications> {
    return this.http.put<Classifications>(`${this.base_url}/classifications/`, data,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }


  //CRUD Companies
  viewCompanies(): Observable<Companies[]> {
    return this.http.get<Companies[]>(`${this.base_url}/companies/`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  insertCompanies(data: Companies): Observable<Companies> {
    return this.http.post<Companies>(`${this.base_url}/companies/`, data,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  deleteCompanies(company: Companies) {
    return this.http.delete<Companies>(`${this.base_url}/companies/${company.id}`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  updateCompanies(data: Companies): Observable<Companies> {
    return this.http.put<Companies>(`${this.base_url}/companies/`, data,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }


  //CRUD Priorities
  viewPriorities(): Observable<Priorities[]> {
    return this.http.get<Priorities[]>(`${this.base_url}/priorities/`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  insertPriorities(data: Priorities): Observable<Priorities> {
    return this.http.post<Priorities>(`${this.base_url}/priorities/`, data,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  deletePriorities(priority: Priorities) {
    return this.http.delete<Priorities>(`${this.base_url}/priorities/${priority.id}`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  updatePriorities(data: Priorities): Observable<Priorities> {
    return this.http.put<Priorities>(`${this.base_url}/priorities/`, data,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }


  //CRUD Products
  viewProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(`${this.base_url}/products/`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  insertProducts(data: Products): Observable<Products> {
    return this.http.post<Products>(`${this.base_url}/products/`, data,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  deleteProducts(product: Products) {
    return this.http.delete<Products>(`${this.base_url}/products/${product.id}`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  updateProducts(data: Products): Observable<Products> {
    return this.http.put<Products>(`${this.base_url}/products/`, data,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  //CRUD Roles
  viewRoles(): Observable<Roles[]> {
    return this.http.get<Roles[]>(`${this.base_url}/roles/`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  insertRoles(data: Roles): Observable<Roles> {
    return this.http.post<Roles>(`${this.base_url}/roles/`, data,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  deleteRoles(role: Roles) {
    return this.http.delete<Roles>(`${this.base_url}/roles/${role.id}`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  updateRoles(data: Roles): Observable<Roles> {
    return this.http.put<Roles>(`${this.base_url}/roles/`, data,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }


  //CRUD Status
  viewStatus(): Observable<Status[]> {
    return this.http.get<Status[]>(`${this.base_url}/status/`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  insertStatus(data: Status): Observable<Status> {
    return this.http.post<Status>(`${this.base_url}/status/`, data,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  deleteStatus(status: Status) {
    return this.http.delete<Status>(`${this.base_url}/status/${status.id}`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  updateStatus(data: Status): Observable<Status> {
    return this.http.put<Status>(`${this.base_url}/status/`, data,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  //CRUD Users
  viewUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.base_url}/users/`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  insertUsers(data: Users): Observable<Users> {
    return this.http.post<Users>(`${this.base_url}/users/`, data,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  deleteUsers(user: Users) {
    return this.http.delete<Users>(`${this.base_url}/users/${user.id}`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  updateUsers(data: Users): Observable<Users> {
    return this.http.put<Users>(`${this.base_url}/users/`, data,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  getUserByNip(nip: string): Observable<Users> {
    return this.http.get<Users>(`${this.base_url}/users/${nip}`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  //Crud dashboard Admin
  dashboardAdmin(): Observable<TicketStatus> {
    return this.http.get<TicketStatus>(`${this.base_url}/tickets/status`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }
  //Crud dashboard Client
  dashboardClient(data: string): Observable<TicketStatus> {
    return this.http.get<TicketStatus>(`${this.base_url}/tickets/status/client/${data}`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }
  //Crud dashboard Agent
  dashboardAgent(data: string): Observable<TicketStatus> {
    return this.http.get<TicketStatus>(`${this.base_url}/tickets/status/agent/${data}`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }
  //Crud dashboard Customer
  dashboardCustomer(data: string): Observable<TicketStatus> {
    return this.http.get<TicketStatus>(`${this.base_url}/tickets/status/customer/${data}`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }
  //CRUD dashboardRecentAdmin
  recentAdmin(): Observable<Tickets[]> {
    return this.http.get<Tickets[]>(`${this.base_url}/tickets/`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  recentAgent(nip:string): Observable<Tickets[]> {
    return this.http.get<Tickets[]>(`${this.base_url}/tickets/agent/${nip}`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  recentClient(company:string): Observable<Tickets[]> {
    return this.http.get<Tickets[]>(`${this.base_url}/tickets/client/${company}`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  recentCustomer(nip:string): Observable<Tickets[]> {
    return this.http.get<Tickets[]>(`${this.base_url}/tickets/customer/${nip}`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  // CRUD TICKET
  insertTicket(data: Tickets): Observable<Tickets> {
    return this.http.post<Tickets>(`${this.base_url}/tickets/`, data,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  updateStatusTicket(data: Tickets): Observable<Tickets> {
    console.log(data);
    return this.http.put<Tickets>(`${this.base_url}/tickets/`, data,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  getTicketByCode(code: string): Observable<TicketHeader> {
    return this.http.get<TicketHeader>(`${this.base_url}/tickets/${code}`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  getListTicket(): Observable<Tickets[]> {
    return this.http.get<Tickets[]>(`${this.base_url}/tickets/`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  getListTicketByAgent(nip: string): Observable<Tickets[]> {
    return this.http.get<Tickets[]>(`${this.base_url}/tickets/agent/${nip}`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  getListTicketByCompany(name: string): Observable<Tickets[]> {
    return this.http.get<Tickets[]>(`${this.base_url}/tickets/client/${name}`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  getListTicketByCustomer(nip: string): Observable<Tickets[]> {
    return this.http.get<Tickets[]>(`${this.base_url}/tickets/customer/${nip}`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }


  // CRUD ACCOUNT
  insertAccount(data: Accounts): Observable<Accounts> {
    return this.http.post<Accounts>(`${this.base_url}/accounts/insert`, data,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  forgotPassword(data: Accounts): Observable<Accounts> {
    return this.http.put<Accounts>(`${this.base_url}/accounts/forgot`, data);;
  }

  changePassword(data: any): Observable<any> {
    return this.http.put<any>(`${this.base_url}/accounts/update`, data);;
  }

  getChart(year: string): Observable<TicketChart[]> {
    return this.http.get<TicketChart[]>(`${this.base_url}/tickets/charts/${year}`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  getChartClient(company : string): Observable<TicketChart[]> {
    return this.http.get<TicketChart[]>(`${this.base_url}/tickets/charts/client/${company}`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  getChartAgent(nip : string): Observable<TicketChart[]> {
    return this.http.get<TicketChart[]>(`${this.base_url}/tickets/charts/agent/${nip}`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  getReport(nip) {//tambahin parameter nip
    let headers_object = new HttpHeaders()
      .set("Authorization", "Bearer " + this.authService.getToken())
      .set("Content-Type", "application/pdf");
    this.http.get(this.base_url2 + `/report/totalTicketAgent/${nip}`, { headers: headers_object, responseType: 'blob' }).subscribe(res => {
      const blob = new Blob([res], { type: 'application/octet-stream' })
      saveAs(blob, "repot" + ".pdf");
    })
  }
  // CUSTOMER
  viewCustomer(data: string): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.base_url}/users/all-customer/${data}`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }
  getPhoto(data: string) {// photo/profile/files/id
    return this.http.get<String>(`${this.base_url}/photo/files/${data}`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  // AGENT
  viewAgent(): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.base_url}/users/agent`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  getAgentModal(id:string):Observable<AgentModal[]> {
    return this.http.get<AgentModal[]>(`${this.base_url}/tickets/relation/${id}`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  // AGENT RELATION
  viewAgentRelation(): Observable<AgentRelations[]> {
    return this.http.get<AgentRelations[]>(`${this.base_url}/agent-relations/`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  insertAgentRelation(data: AgentRelations): Observable<AgentRelations> {
    return this.http.post<AgentRelations>(`${this.base_url}/agent-relations/insert`, data,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  // CLIENT
  viewClient(): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.base_url}/users/all-clients`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  //CLIENT PRODUCT
  viewClientProduct(): Observable<ClientProducts[]> {
    return this.http.get<ClientProducts[]>(`${this.base_url}/client-products/`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  insertClientProduct(data: ClientProducts): Observable<ClientProducts> {
    return this.http.post<ClientProducts>(`${this.base_url}/client-products/`, data,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  viewCLientProductByCompanyname(data: Companies): Observable<ClientProducts[]> {
    return this.http.get<ClientProducts[]>(`${this.base_url}/client-products/${data.name}`,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  insertPhotoProfile(data:any): Observable<any> {
    return this.http.put<any>(`${this.base_url}/users/`, data,
      { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }
}

