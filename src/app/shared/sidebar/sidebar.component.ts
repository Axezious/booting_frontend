import { Component, OnInit } from '@angular/core';
import { Accounts } from 'src/app/model/accounts';
import { AuthService } from 'src/app/service/auth.service';
import { Users } from 'src/app/model/users';
import { Roles } from 'src/app/model/roles';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public uiBasicCollapsed = false;
  public samplePagesCollapsed = false;
  account: Accounts = new Accounts();
  role:string;
  
  constructor(private auth: AuthService) {
    // this.account = auth.getAccount();
    this.account.idUser = new Users();
    this.account.idUser.idRole = new Roles();
    
  }



  ngOnInit() {
    const body = document.querySelector('body');
    this.account = this.auth.getAccount()
    this.role = this.auth.getAccount().idUser.idRole.code;
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    document.querySelectorAll('.sidebar .nav-item').forEach(function (el) {
      el.addEventListener('mouseover', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

}
