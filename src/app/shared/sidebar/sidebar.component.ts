import { Component, OnInit } from '@angular/core';
import { Accounts } from 'src/app/model/accounts';
import { AuthService } from 'src/app/service/auth.service';
import { Users } from 'src/app/model/users';
import { Roles } from 'src/app/model/roles';
import { LoginComponent } from 'src/app/user-pages/login/login.component';
import { saveAs } from "file-saver"
import { ApiService } from 'src/app/service/api.service';
import { RefreshProfileService } from 'src/app/service/refresh-profile.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public uiBasicCollapsed = false;
  public samplePagesCollapsed = false;
  account: Accounts = new Accounts();
  role: string;
  roleHelper: string = localStorage.getItem('roleCode');
  readonly base_url = 'http://147.139.130.49:8080';
  urlFoto:string = ""
  
  
  constructor(private auth: AuthService, private apiservice: ApiService,private profileService:RefreshProfileService) {
    // this.account = auth.getAccount();
    this.account.idUser = new Users();
    this.account.idUser.idRole = new Roles();
  }


  // downloadReport() {
  //   this.apiservice.getReport();
  // }
  getPhotoProfile(){
    this.account = this.auth.getAccount();
    if(this.account.idUser.idPhoto != null || this.account.idUser.idPhoto != undefined){
      this.urlFoto = `${this.base_url}/photo-profile/files/${this.account.idUser.idPhoto.id}`
    }
  }
  ngOnInit() {
    this.getPhotoProfile();
    this.profileService.profile.subscribe(data=>{
      this.getPhotoProfile(); 
    })
    const body = document.querySelector('body');
    console.log(localStorage.getItem('idPhoto'));
    this.role = this.auth.getAccount().idUser.idRole.code;
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    document.querySelectorAll('.sidebar .nav-item').forEach(function (el) {
      el.addEventListener('mouseover', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }
  async getPhoto(data:string){
    this.apiservice.getPhoto(data).subscribe(result =>{
      console.log(result);
      
    })
  }
}
