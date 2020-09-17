import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/service/auth.service';
import { ApiService } from 'src/app/service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Accounts } from 'src/app/model/accounts';
import { RefreshProfileService } from 'src/app/service/refresh-profile.service';
import { MessageService } from 'primeng/api';
import { InsertSuccessService } from '../../service/insert-success.service';
import { UpdateSuccessService } from '../../service/update-success.service';
import { NotificationService } from 'src/app/service/notification.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [NgbDropdownConfig,MessageService]
})
export class NavbarComponent implements OnInit {
  public iconOnlyToggled = false;
  public sidebarToggled = false;
  account: Accounts = new Accounts();
  readonly base_url = 'http://147.139.130.49:8080';
  urlFoto:string = ""
  
  constructor(config: NgbDropdownConfig,private auth: AuthService,
     private api: ApiService, private router: Router,private route:ActivatedRoute,
     private profileService:RefreshProfileService,private messageService:MessageService,
     private insertToast:InsertSuccessService, private updateToast:UpdateSuccessService,
     private toast:NotificationService) {
    config.placement = 'bottom-right';
    this.account = auth.getAccount();
  }

  ngOnInit() {
    this.getPhotoProfile();
    this.profileService.profile.subscribe(data =>{
      console.log(data);
      this.getPhotoProfile();
      this.messageService.add({ key: 'tc', severity: 'info', summary: 'Info', detail: 'Photo Profile Berhasil' });
    })
    this.insertToast.toast.subscribe(data =>{
      this.messageService.add({ key: 'tc', severity: 'info', summary: 'Info', detail: 'Add Data Success' });
    })
    this.updateToast.toast.subscribe(data =>{
      this.messageService.add({ key: 'tc', severity: 'info', summary: 'Info', detail: 'Update Data Success' });
    })
    this.toast.toastInsertSuccess.subscribe(data =>{
      this.messageService.add({ key: 'tc', severity: 'info', summary: 'Info', detail: `Add Data Success` });
    })
    this.toast.toastUpdateSuccess.subscribe(data =>{
      this.messageService.add({ key: 'tc', severity: 'info', summary: 'Info', detail: `Update Data Success` });
    })
    this.toast.toastDeleteSuccess.subscribe(data =>{
      this.messageService.add({ key: 'tc', severity: 'info', summary: 'Info', detail: `Delete Data Success` });
    })
    this.toast.toastChangePassSuccess.subscribe(data =>{
      this.messageService.add({ key: 'tc', severity: 'info', summary: 'Info', detail: `Your Password has been Changed` });
    })
    this.toast.toastChangePassFail.subscribe(data =>{
      this.messageService.add({ key: 'tc', sticky: true, severity: 'error', summary: 'Info', detail: 'Request Failed' });
    })
  }


  getPhotoProfile(){
    this.account = this.auth.getAccount();
    if(this.account.idUser.idPhoto != null || this.account.idUser.idPhoto != undefined){
      this.urlFoto = `${this.base_url}/photo/files/${this.account.idUser.idPhoto.id}`
      console.log(this.urlFoto);
    }
    
  }

  // toggle sidebar in small devices
  toggleOffcanvas() {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }

  // toggle sidebar
  toggleSidebar() {
    let body = document.querySelector('body');
    if((!body.classList.contains('sidebar-toggle-display')) && (!body.classList.contains('sidebar-absolute'))) {
      this.iconOnlyToggled = !this.iconOnlyToggled;
      if(this.iconOnlyToggled) {
        body.classList.add('sidebar-icon-only');
      } else {
        body.classList.remove('sidebar-icon-only');
      }
    } else {
      this.sidebarToggled = !this.sidebarToggled;
      if(this.sidebarToggled) {
        body.classList.add('sidebar-hidden');
      } else {
        body.classList.remove('sidebar-hidden');
      }
    }
  }

  // toggle right sidebar
  toggleRightSidebar() {
    document.querySelector('#right-sidebar').classList.toggle('open');
  }

  logout() {
    this.auth.removeStorage();
    this.router.navigateByUrl('/user-pages/login')
  }

}
