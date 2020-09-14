import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';
import { Accounts } from 'src/app/model/accounts';
import { LoginComponent } from '../login/login.component';
import { User } from 'firebase';
import { Users } from 'src/app/model/users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  readonly base_url = 'http://147.139.130.49:8080';
  urlFoto: string = ""
  account: Accounts

  selectedFile: any;
  imageUrl: any
  fileList: File;
  listOfFiles: any[] = [];
  user: Users
  data: any
  fd : any = new FormData()

  constructor(private apiService: ApiService, private authService: AuthService, private router : Router) {
    this.account = authService.getAccount();
    // console.log(this.account);
    this.user = this.account.idUser
  }

  onFileChanged(event: any){
    const reader = new FileReader();
    this.selectedFile = event.target.files[0];
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.imageUrl = reader.result
      // console.log(this.imageUrl);
    }
    // this.fileList.push(selectedFile);
    // this.listOfFiles.push(selectedFile.name);

    // console.log(this.selectedFile);
    // this.user.idPhoto.data = this.selectedFile;
    // console.log("kirim PROFILE");
    // console.log(this.user.idPhoto);
    this.data = this.selectedFile
    // this.fd = new FormData();
    // this.fd.append('users', JSON.stringify(this.user));
    this.fd.append('file', this.selectedFile);
    // this.fd.forEach(element => {
    //   console.log(element);
    // });
    // this.saveChanges(fd);
    // console.log(this.fd);
  }

  saveChanges() {
    this.fd.append('users', JSON.stringify(this.user));
    let data = this.fd
    // console.log(data);
    this.apiService.insertPhotoProfile(data).subscribe(result => {
      this.account.idUser = result
      this.authService.setAccount(this.account)
      console.log(result);
      // console.log("SAVE CHANGES");
      // this.router.onSameUrlNavigation
      // this.router.navigate(['/dashboard', {
      //   "refresh" : (new Date).getTime()
      // }])
      this.router.navigateByUrl('/dashboard')
    }, err => {
      console.log(err);
    })
  }


  public imagePath;
  imgURL: any;
  public message: string;
  trigger: number = 0;

  preview(kosong, event: any) {
    if (kosong.length === 0)
      return;
    var mimeType = kosong.type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = kosong;
    reader.readAsDataURL(kosong[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      this.trigger = 1;
    }

  }

  ngOnInit() {
    this.account = this.authService.getAccount();
    if (this.account.idUser.idPhoto != null || this.account.idUser.idPhoto != undefined) {
      this.urlFoto = `${this.base_url}/photo-profile/files/${this.account.idUser.idPhoto.id}`
    }
    console.log(this.urlFoto);

  }
  

}
