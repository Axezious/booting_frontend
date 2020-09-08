import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';
import { Accounts } from 'src/app/model/accounts';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  readonly base_url = 'http://147.139.130.49:8080';
  urlFoto: string = ""
  account: Accounts
  constructor(private apiService: ApiService, private authService: AuthService) {
    this.account = authService.getAccount();

  }

  ngOnInit() {
    this.account = this.authService.getAccount();
    this.account.idUser.idPhoto.id = localStorage.getItem('idPhoto')
    if (this.account.idUser.idPhoto != null || this.account.idUser.idPhoto != undefined) {
      this.urlFoto = `${this.base_url}/photo-profile/files/${this.account.idUser.idPhoto.id}`
    }
    console.log(this.urlFoto);

  }

}
