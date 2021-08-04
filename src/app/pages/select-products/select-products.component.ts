import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
declare var $: any;
const apiUrl = environment.apiUrl;

@Component({
  selector: 'app-select-products',
  templateUrl: './select-products.component.html',
  styleUrls: ['./select-products.component.css'],
})
export class SelectProductsComponent implements OnInit, AfterViewInit {
  cat_id: any;
  category: any;
  products: any = [];
  selected: any = [];
  selectedProducts: any = [];
  checkedProducts: any = [];
  checkedList: any = [];
  searchText: String = '';
  onSearchCatId: String = '';
  closeResult: string = '';

  tooltip: boolean = false;

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

        this.cat_id = id.cat_id;
        this.onSearchCatId = this.cat_id;
      });
      let userdata;
      let udata = localStorage.getItem('userdata');
      if (udata) {
        userdata = JSON.parse(udata);
      }
      let id = userdata.userId;
      this.http
        .post(apiUrl + 'get_category_by_parent_id.php', {
          cat_id: this.cat_id,
        })
        .subscribe(
          (result) => {
            const response = JSON.parse(JSON.stringify(result));
            const data = response.products;
            this.products = data;
            this.category = response.category;
            for (let i = 0; i < data.length; i++) {
              if (
                this.selected.find(
                  (x: any) => x.product_id === data[i].product_id
                )
              ) {
                data[i].isChecked = true;
              } else {
                data[i].isChecked = false;
              }
            }
            this.products = data;
          },
          (error) => {
            // console.log(error);
          }
        );

      if (localStorage.getItem('selected')) {
        let sdata = localStorage.getItem('selected');
        if (sdata) {
          this.selectedProducts = JSON.parse(sdata);
        }
        this.selected = this.selectedProducts;
        console.log(this.selected);
        (
          document.querySelector('#selected-products') as HTMLElement
        ).style.display = 'block';
      }
    }
  }

  searchProduct() {
    let input = {
      category_id: this.onSearchCatId,
      keyword: this.searchText,
    };
    this.http.post(apiUrl + 'search_product.php', input).subscribe(
      (result) => {
        const data = JSON.parse(JSON.stringify(result));
        this.products = data;
        for (let i = 0; i < data.length; i++) {
          if (
            this.selected.find((x: any) => x.product_id === data[i].product_id)
          ) {
            data[i].isChecked = true;
          } else {
            data[i].isChecked = false;
          }
        }
        this.products = data;
      },
      (error) => {}
    );
  }

  checked(item: any) {
    if (this.selected.indexOf(item) != -1) {
      return true;
    }
  }
  async onChange(event: any, item: any, i: Number) {
    this.tooltip = false;
    if (event.target.checked) {
      this.selected.push(item);
    } else {
      this.selected.splice(this.selected.indexOf(item), 1);
    }
    (
      document.querySelector('#selected-products') as HTMLElement
    ).style.display = 'block';

    (
      document.querySelector('#button-to-write-proc') as HTMLElement
    ).style.display = 'block';

    if (this.selected.length == 0) {
      (
        document.querySelector('#selected-products') as HTMLElement
      ).style.display = 'none';
      (
        document.querySelector('#button-to-write-proc') as HTMLElement
      ).style.display = 'none';
    }
  }

  ngAfterViewInit() {
    $('[data-toggle="tooltip"]').tooltip();
  }
  removeProd(prod: any) {
    this.selected.splice(this.selected.indexOf(prod), 1);
    if (this.selected.length == 0) {
      (
        document.querySelector('#selected-products') as HTMLElement
      ).style.display = 'none';
      (
        document.querySelector('#button-to-write-proc') as HTMLElement
      ).style.display = 'none';
    }
  }

  writeProcedure() {
    let userdata;
    let udata = localStorage.getItem('userdata');
    if (udata) {
      userdata = JSON.parse(udata);
    }
    let id = userdata.userId;
    let productIds = [];
    for (let i = 0; i < this.selected.length; i++) {
      if (productIds.indexOf(this.selected[i].product_id) == -1) {
        productIds.push({
          productId: this.selected[i].product_id,
        });
      }
    }

    this.http
      .post(apiUrl + 'save_products_for_proc.php', {
        products: productIds,
        userId: id,
      })
      .subscribe((result) => {
        const res = JSON.parse(JSON.stringify(result));
        const id = res.proc_id;
        const proc_no = res.proc_no;
        if (res.success == true) {
          this.router.navigate(['/procedure/' + proc_no + '/0']);
        }
      });
  }

  backToHome() {
    localStorage.setItem('selected', JSON.stringify(this.selected));
    this.router.navigate(['/home']);
  }
}
