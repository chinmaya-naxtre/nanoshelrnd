import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';
const apiUrl = environment.apiUrl;
import Swal from 'sweetalert2';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css'],
})
export class AddAdminComponent implements OnInit, AfterViewInit {
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

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    $(document).click(() => {
      $('dropright').removeClass('show');
    });
    if (localStorage.getItem('token') === null) {
      this.router.navigate(['']);
    } else {
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

  add_admin() {
    if (this.password !== this.confirm_password) {
      alert('Enter same password. Try Again');
    }
    //console.log(this.selectedItemsList);
    for (let i = 0; i < this.selectedItemsList.length; i++) {
      this.selectedProductsIds.push(this.selectedItemsList[i].cat_name);
    }
    console.log(this.selectedProductsIds);
    let input = {
      username: this.username,
      email: this.email,
      first_name: this.first_name,
      last_name: this.last_name,
      password: this.password,
      user_type: this.user_type,
      products_names: this.selectedProductsIds,
    };

    this.http.post(apiUrl + 'save_user.php', input).subscribe((result) => {
      const res = JSON.parse(JSON.stringify(result));
      if (res.success == true) {
        Swal.fire('Profile Added', '', 'success');
        this.router.navigate(['/superAdminPanel']);
      } else {
        alert('Some error occurred while saving...Please Try Again.');
      }
    });
  }
  ngAfterViewInit() {}
}
