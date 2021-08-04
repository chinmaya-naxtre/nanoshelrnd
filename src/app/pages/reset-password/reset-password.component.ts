import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

const apiUrl = environment.apiUrl;

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  username: string = '';
  newPassword: string = '';
  retypePassword: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  setPassword() {
    if (this.newPassword !== this.retypePassword) {
      alert('Enter same password. Try Again');
    }
    let setPasswordData = {
      username: this.username,
      password: this.newPassword,
    };

    this.http
      .post(apiUrl + 'reset_password.php', setPasswordData)
      .subscribe((response) => {
        let res = JSON.parse(JSON.stringify(response));
        if (res.success == true) {
          Swal.fire('Password Saved Successfully', '', 'success');
          this.router.navigate(['']);
        } else {
          alert('Something Went wrong, Please try again');
        }
      });
  }
}
