import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { FormsModule } from '@angular/forms';

const apiUrl = environment.apiUrl;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  token: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  login() {
    let loginData = {
      username: this.username,
      password: this.password,
    };

    //console.log(loginData);
    this.http.post(apiUrl + 'login.php', loginData).subscribe((response) => {
      let data = JSON.parse(JSON.stringify(response));

      if (data.success == true) {
        //console.log(data.data);
        let userdata = data.data.userdata;
        //console.log(userdata);
        let token = data.data.token;
        localStorage.setItem('token', token);
        localStorage.setItem('userdata', JSON.stringify(userdata));

        this.router.navigate(['/home']);
      } else {
        alert('Login Failed, Try Again...');
      }
    });
  }
}
