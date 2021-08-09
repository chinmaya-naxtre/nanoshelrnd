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
  items: any[] = [];
  username: string = '';
  email: string = '';
  first_name: string = '';
  last_name: string = '';
  password: string = '';
  confirm_password: string = '';
  user_type: string = '';

  products: any = [];
  selected: any = [];
  checkedProducts: any = [];
  checkedList: any = [];
  prodsNames: any = [];
  subCatProds: any = [];
  selectedSubCatPodsNames: any = [];
  selectedSubCatProdsIds: any = [];

  SubSelect: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    $(document).click(() => {
      $('dropright').removeClass('show');
    });
    if (localStorage.getItem('token') === null) {
      this.router.navigate(['']);
    } else {
      this.http
        .get(`${apiUrl}getCategories.php`)
        .toPromise()
        .then((data) => {
          this.items = JSON.parse(JSON.stringify(data));
          console.log(this.items);
        });
    }
    this.loadScript();
  }
  loadScript() {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = './assets/js/custom.extra.js';

    document.getElementById('extra-script')?.append(script);
  }

  checked(item: any) {
    // if (this.selected.indexOf(item.id) != -1) {
    //   return true;
    // }
  }

  async onChange(event: any, item: any, i: Number) {
    if (event.target.checked) {
      this.selected.push(item.id);
      this.prodsNames.push(item.cat_name);
    } else {
      this.selected.splice(this.selected.indexOf(item.id), 1);
      this.prodsNames.splice(this.prodsNames.indexOf(item.cat_name), 1);
    }

    console.log(this.selected);
    console.log(this.prodsNames);
  }

  checkedSub(item: any) {
    if (this.selectedSubCatProdsIds.indexOf(item.id) != -1) {
      return true;
    }
  }

  async onChangeSub(event: any, item: any, i: Number) {
    if (event.target.checked) {
      this.selectedSubCatProdsIds.push(item.id);
      this.selectedSubCatPodsNames.push(item.cat_name);
    } else {
      this.selectedSubCatProdsIds.splice(
        this.selectedSubCatProdsIds.indexOf(item.id),
        1
      );
      this.selectedSubCatPodsNames.splice(
        this.selectedSubCatPodsNames.indexOf(item.cat_name),
        1
      );
    }

    //console.log(this.selectedSubCatProdsIds);
    // console.log(this.selectedSubCatPodsNames);
  }
  checkAll(ev: any) {
    // this.items.forEach((x) => (x.state = ev.target.checked));
    if (ev.target.checked) {
      this.items.forEach((item) => {
        this.selected.push(item.id);
        this.prodsNames.push(item.cat_name);
        this.checkAllSubByCategory(true, item);
        item.isChecked = true;
      });
    } else {
      this.items.forEach((item) => {
        this.checkAllSubByCategory(false, item);

        item.isChecked = false;
      });
      this.selected = [];
      this.prodsNames = [];
    }
  }

  checkAllSubByCategory(isChecked: any, item: any) {
    console.log(item);
    this.SubSelect = true;
    if (isChecked) {
      item.sub_category.forEach((subItem: any) => {
        this.selectedSubCatProdsIds.push(subItem.id);
        this.selectedSubCatPodsNames.push(subItem.cat_name);

        subItem.isChecked = true;
      });
    } else {
      this.SubSelect = false;
      item.sub_category.forEach((subItem: any) => {
        subItem.isChecked = false;
      });
      this.selectedSubCatProdsIds = [];
      this.selectedSubCatPodsNames = [];
    }

    // console.log(this.selectedSubCatPodsNames);
    //console.log(this.selectedSubCatProdsIds);
  }
  checkAllSub(ev: any, item: any) {
    console.log(item);
    if (ev.target.checked) {
      item.sub_category.forEach((subItem: any) => {
        this.selectedSubCatProdsIds.push(subItem.id);
        this.selectedSubCatPodsNames.push(subItem.cat_name);
        subItem.isChecked = true;
      });
    } else {
      item.sub_category.forEach((subItem: any) => {
        subItem.isChecked = false;
      });
      this.selectedSubCatProdsIds = [];
      this.selectedSubCatPodsNames = [];
    }

    console.log(this.selectedSubCatPodsNames);
    console.log(this.selectedSubCatProdsIds);
  }

  isAllChecked() {
    return this.items.every((_) => _.state);
  }

  add_admin() {
    if (this.password !== this.confirm_password) {
      alert('Enter same password. Try Again');
    }

    let input = {
      username: this.username,
      email: this.email,
      first_name: this.first_name,
      last_name: this.last_name,
      password: this.password,
      user_type: this.user_type,
      products_names: this.prodsNames,
      prodsIds: this.selected,
      subProds: this.selectedSubCatPodsNames,
      subProdsIds: this.selectedSubCatProdsIds,
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
