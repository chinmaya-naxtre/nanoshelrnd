import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

const apiUrl = environment.apiUrl;

@Component({
  selector: 'app-procedure-list',
  templateUrl: './procedure-list.component.html',
  styleUrls: ['./procedure-list.component.css'],
})
export class ProcedureListComponent implements OnInit {
  user_id: any;
  user_type: any;
  userdata: any;
  procedures: any = [];
  resProcId: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token') === null) {
      this.router.navigate(['']);
    } else {
      this.activatedRoute.params.subscribe((params) => {
        let id = JSON.parse(JSON.stringify(params));
        this.user_id = id.userId;
      });
      if (localStorage.getItem('userdata')) {
        let udata = localStorage.getItem('userdata');
        if (udata) {
          this.userdata = JSON.parse(udata);
          this.user_id = this.userdata.userId;
          this.user_type = this.userdata.userType;
        }
        if (this.user_type == '0') {
          let inputData = {
            userId: this.user_id,
          };
          this.http
            .post(apiUrl + 'show_procedures.php', inputData)
            .subscribe((result) => {
              const res = JSON.parse(JSON.stringify(result));
              console.log(res);
              if (res.success == true) {
                this.procedures = res.data;
                console.log(this.procedures);
              }
            });
        } else {
          let input = {
            userId: this.user_id,
          };
          this.http
            .post(
              apiUrl + 'show_procedures_by_user_by_latest_version.php',
              input
            )
            .subscribe((result) => {
              const res = JSON.parse(JSON.stringify(result));

              if (res.success == true) {
                this.procedures = res.data;
                console.log(this.procedures);
              }
            });
        }
      }
    }
  }

  editProcedure(id: any, version: any) {
    console.log(version);
    this.router.navigate(['/procedure/' + id + '/' + version]);
  }
}
