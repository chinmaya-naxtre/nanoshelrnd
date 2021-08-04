import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

import * as customBuildEditor from '../../ckeditorCustom/build/ckEditor';

const apiUrl = environment.apiUrl;
declare var $: any;
@Component({
  selector: 'app-procedure',
  templateUrl: './procedure.component.html',
  styleUrls: ['./procedure.component.css'],
})
export class ProcedureComponent implements OnInit {
  public config = {
    toolbar: {
      items: [
        'heading',
        '|',
        'alignment',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        'uploadImage',
        'undo',
        'redo',
        'todoList',
        'fontSize',
        'fontFamily',
        'fontColor',
        'fontBackgroundColor',
        'fontFamily',
      ],
      shouldNotGroupWhenFull: true,
    },
    image: {
      toolbar: [
        'imageStyle:inline',
        'imageStyle:block',
        'imageStyle:side',
        '|',
        'toggleImageCaption',
        'imageTextAlternative',
      ],
    },
    language: 'en',
  };
  public Editor = customBuildEditor;
  public htmlData: any;
  content: any;
  procedure_id: any;
  products: any = [];
  ptext: String = '';
  cleanText: any;
  userId: String = '';
  version_no: any;
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

        console.log(id);

        this.procedure_id = id.procedureId;
        this.version_no = id.version;
      });

      let input = {
        id: this.procedure_id,
      };

      console.log(input);

      this.http
        .post(apiUrl + 'get_product_by_proc.php', input)
        .subscribe((result) => {
          const res = JSON.parse(JSON.stringify(result));
          console.log(res);
          if (res.success == true) {
            this.products = res.data;
            console.log(this.products);
            (
              document.querySelector('#productsList') as HTMLElement
            ).style.display = 'block';
          }
        });

      let inputForSingleProcess = {
        id: this.procedure_id,
        version_no: this.version_no,
      };

      this.http
        .post(apiUrl + 'find_procedure_by_id.php', inputForSingleProcess)
        .subscribe((result) => {
          const resultData = JSON.parse(JSON.stringify(result));
          console.log(resultData.data);
          this.ptext = JSON.stringify(resultData.text);
          if (this.ptext.length == 2) {
            this.ptext = '';
            this.htmlData = this.ptext;
          } else {
            this.ptext = this.ptext.slice(1, -1);
            this.htmlData = this.ptext;
          }
        });
    }
  }

  saveProcedure() {
    this.activatedRoute.params.subscribe((params) => {
      let id = JSON.parse(JSON.stringify(params));
      console.log(id);
      this.procedure_id = id.procedureId;
    });
    if (this.htmlData.length == 0) {
      this.htmlData = '';
    }
    let input = {
      id: this.procedure_id,
      text: this.htmlData,
    };
    console.log('saveProcedure', input);
    this.http.post(apiUrl + 'save_procedure.php', input).subscribe((result) => {
      const res = JSON.parse(JSON.stringify(result));
      if (res.success == true) {
        Swal.fire('Procedure saved', '', 'success');
      } else {
        alert('Some error occured while saving...');
      }
      console.log(result);
    });
    let userdata;
    if (localStorage.getItem('userdata')) {
      let udata = localStorage.getItem('userdata');
      if (udata) {
        userdata = JSON.parse(udata);
      }
      this.userId = userdata.userId;
    }
    localStorage.removeItem('selected');
    this.router.navigate(['/procedure-list/' + this.userId]);
  }
}
