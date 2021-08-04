import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Router, ActivatedRoute } from '@angular/router';
const apiUrl = environment.apiUrl;
import Swal from 'sweetalert2';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css'],
})
export class EditAdminComponent implements OnInit, AfterViewInit {
  selectedItemsList: any = [];
  checkedIDs: any = [];
  selectedProductsIds: any = [];

  items: any[] = [];
  products: any = [];
  cat_id: any;
  category: any;
  selected: any = [];
  selectedProducts: any = [];
  checkedProducts: any = [];
  checkedList: any = [];
  searchText: String = '';
  onSearchCatId: String = '';
  closeResult: string = '';
  checkboxesDataList: any = [];
  username: string = '';
  email: string = '';
  first_name: string = '';
  last_name: string = '';
  password: string = '';
  confirm_password: string = '';
  user_type: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token') === null) {
      this.router.navigate(['']);
    } else {
      $('input').parent().removeClass('is-active');
      this.fetchSelectedItems();
      this.fetchCheckedIDs();
      console.log(this.checkedIDs);
      this.http
        .get(`${apiUrl}get_category.php`)
        .toPromise()
        .then((data) => {
          this.items = JSON.parse(JSON.stringify(data));
          this.checkboxesDataList = this.items;
          //console.log(this.checkboxesDataList);
        });
      this.activatedRoute.params.subscribe((params) => {
        let id = JSON.parse(JSON.stringify(params));

        let inputData = {
          user_id: id.user_id,
        };
        this.http
          .post(apiUrl + 'get_user.php', inputData)
          .subscribe((result) => {
            const res = JSON.parse(JSON.stringify(result));
            let user_admin_data = res.data;
            this.username = user_admin_data.user_name;
            this.email = user_admin_data.email;
            this.password = user_admin_data.password;
            this.first_name = user_admin_data.first_name;
            this.last_name = user_admin_data.last_name;
            this.confirm_password = user_admin_data.password;
            this.user_type = user_admin_data.user_type;
          });
      });
      $('input[name="cLfreight"]').focus();
    }
  }

  changeSelection() {
    this.fetchSelectedItems();
  }

  fetchSelectedItems() {
    this.selectedItemsList = this.checkboxesDataList.filter(
      (value: any, index: any) => {
        return value.isChecked;
      }
    );
    //console.log(this.selectedItemsList);
  }

  fetchCheckedIDs() {
    this.checkedIDs = [];
    this.checkboxesDataList.forEach((value: any, index: any) => {
      if (value.isChecked) {
        this.checkedIDs.push(value.id);
      }
    });
  }

  update_profile() {
    this.activatedRoute.params.subscribe((params) => {
      let id = JSON.parse(JSON.stringify(params));

      if (this.password !== this.confirm_password) {
        alert('Enter same password. Try Again');
      }
      for (let i = 0; i < this.selectedItemsList.length; i++) {
        this.selectedProductsIds.push(this.selectedItemsList[i].cat_name);
      }
      let input = {
        username: this.username,
        email: this.email,
        first_name: this.first_name,
        last_name: this.last_name,
        password: this.password,
        user_type: this.user_type,
        products_names: this.selectedProductsIds,
        user_id: id.user_id,
      };
      this.http.post(apiUrl + 'update_user.php', input).subscribe((result) => {
        const res = JSON.parse(JSON.stringify(result));
        console.log(res);
        if (res.success == true) {
          Swal.fire('Profile Updated', '', 'success');
          this.router.navigate(['/superAdminPanel']);
        } else {
          alert('Some error occurred while saving...Please Try Again.');
        }
      });
    });
  }

  ngAfterViewInit() {
    $('input').focus();
  }
}
