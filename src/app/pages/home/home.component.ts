import { Component, OnInit } from '@angular/core';
// import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
// import { style } from '@angular/animations';
import { Router } from '@angular/router';
declare var $: any;

const apiUrl = environment.apiUrl;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  items: any[] = [];
  products: any = [];
  checkedProducts: any = [];
  checkedList: any = [];
  selected: any = [];
  searchText: String = '';
  onSearchCatId: String = '';
  userdata: any;
  closeResult: string = '';
  accessable_products: any = [];
  all_items: any = [];
  all_items_cat_name: any = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('token') === null) {
      this.router.navigate(['']);
    } else {
      let udata = localStorage.getItem('userdata');
      if (udata) {
        this.userdata = JSON.parse(udata);
        this.accessable_products = this.userdata.accessable_products;
      }
      console.log(this.accessable_products);
      this.http
        .get(`${apiUrl}get_category.php`)
        .toPromise()
        .then((data) => {
          this.all_items = JSON.parse(JSON.stringify(data));
          for (let i = 0; i < this.all_items.length; i++) {
            if (
              this.accessable_products.indexOf(this.all_items[i].cat_name) != -1
            ) {
              this.items.push(this.all_items[i]);
            }
          }
          console.log(this.items);
        });
    }
  }

  open(category_id: any) {
    this.router.navigate(['/selectProducts/' + category_id]);
  }
}
