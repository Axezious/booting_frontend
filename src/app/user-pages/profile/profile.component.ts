import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';
import { Accounts } from 'src/app/model/accounts';
import { Users } from 'src/app/model/users';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RefreshProfileService } from 'src/app/service/refresh-profile.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers:[MessageService]
})
export class ProfileComponent implements OnInit {

  readonly base_url = 'http://147.139.130.49:8080';
  urlFoto: string = ""
  account: Accounts;
  tempAccount:Accounts;

  selectedFile: any;
  imageUrl: any
  fileList: File;
  listOfFiles: any[] = [];
  user: Users
  data: any
  fd : any = new FormData()
  contact:string

  constructor(private apiService: ApiService, private authService: AuthService, 
    private router : Router,private messageService:MessageService,private profileService:RefreshProfileService) {
    this.account = authService.getAccount();
    // console.log(this.account);
    this.user = this.account.idUser
    this.tempAccount = new Accounts();
    this.tempAccount.idUser = new Users();
  }

  onFileChanged(event: any){
    const reader = new FileReader();
    this.selectedFile = event.target.files[0];
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.imageUrl = reader.result
    }
    this.data = this.selectedFile
    this.fd.append('file', this.selectedFile);
  }

  blocked: boolean = false;
  saveChanges() {
    this.blocked = true;
    this.user.name = this.tempAccount.idUser.name
    this.user.address = this.tempAccount.idUser.address
    this.user.contact = this.tempAccount.idUser.contact
    console.log(this.user);
    this.fd.append('users', JSON.stringify(this.user));
    let data = this.fd
    this.apiService.insertPhotoProfile(data).subscribe(result => {
      this.account.idUser = result
      this.authService.setAccount(this.account)
      this.profileService.callRefreshPhoto();
      this.blocked = false
      this.router.navigateByUrl('/dashboard')
    }, err => {
      this.blocked = false;
      console.log(err);
      this.messageService.add({ key: 'tc', severity: 'error', summary: 'Info', detail: 'Transaksi Gagal' });
    })
  }

  ngOnInit() {
    this.account = this.authService.getAccount();
    if (this.account.idUser.idPhoto != null || this.account.idUser.idPhoto != undefined) {
      this.urlFoto = `${this.base_url}/photo-profile/files/${this.account.idUser.idPhoto.id}`
    }
    console.log(this.urlFoto);
  }
}
