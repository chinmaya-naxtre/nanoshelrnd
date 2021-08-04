import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  logout() {
    localStorage.removeItem('userdata');
    localStorage.removeItem('token');
    localStorage.clear();
    console.log(localStorage.getItem('token'));
    this.router.navigate(['']);
  }
}
