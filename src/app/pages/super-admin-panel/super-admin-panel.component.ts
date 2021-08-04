import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
const apiUrl = environment.apiUrl;

@Component({
  selector: 'app-super-admin-panel',
  templateUrl: './super-admin-panel.component.html',
  styleUrls: ['./super-admin-panel.component.css'],
})
export class SuperAdminPanelComponent implements OnInit {
  admins: any[] = [];
  admin_type: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token') === null) {
      this.router.navigate(['']);
    } else {
      this.http
        .get(`${apiUrl}getAllAdmins.php`)
        .toPromise()
        .then((data) => {
          this.admins = JSON.parse(JSON.stringify(data));
          console.log(this.admins);
        });
    }
  }

  editAdmin(admin_user_id: any) {
    this.router.navigate(['/edit-admin/' + admin_user_id]);
  }

  deleteAdmin(admin_user_id: any) {
    let inputData = {
      user_id: admin_user_id,
    };

    this.http
      .post(apiUrl + 'delete_user.php', inputData)
      .subscribe((result) => {
        const res = JSON.parse(JSON.stringify(result));
        if (res.success == true) {
          Swal.fire('User Profile Deleted', '', 'success');
        } else {
          alert('Something went wrong, Please Try Again after some time...');
        }
      });
    this.router.navigate(['/superAdminPanel']);
    window.location.reload();
  }

  addAdmin() {
    this.router.navigate(['addAdmin']);
  }
  back() {
    this.router.navigate(['/home']);
  }
}
