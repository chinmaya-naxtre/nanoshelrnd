import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  userId: String = '';
  userType: String = '';
  userName: any;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    let userdata;
    if (localStorage.getItem('userdata')) {
      let udata = localStorage.getItem('userdata');
      if (udata) {
        userdata = JSON.parse(udata);
      }
      this.userId = userdata.userId;
      this.userType = userdata.userType;
      this.userName = userdata.username;
      //console.log(userdata);
      console.log(this.userName);
      if (this.userType == '0') {
        (
          document.querySelector('#adminPanelLink') as HTMLElement
        ).style.display = 'block';
      }
    }
  }

  logout() {
    localStorage.removeItem('userdata');
    localStorage.removeItem('token');
    localStorage.clear();
    //console.log(localStorage.getItem('token'));
    this.router.navigate(['']);
  }
  openAdminPanel() {
    this.router.navigate(['superAdminPanel']);
  }
}
