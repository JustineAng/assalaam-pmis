import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { ProductService } from '../product.service';
import { MemberService } from '../member.service';

import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private assetsFolder = '../assets/img/promos';
  promos: Array<ProductAPIObject.Promo>;
  mobile: boolean = false;

  constructor(private product: ProductService, private member: MemberService,
              private router: Router, private data: DataService, private http: HttpClient) { }

  ngOnInit() {
    if (window.screen.width <= 768) { // 768px portrait
      this.mobile = true;
    }

    // this.http.get('http://192.168.0.36/api/GetProductPromo.php').subscribe(json => {
    //   if (json === null) {
    //     console.log('JSON is null');
    //   } else {
    //     this.promos = <Array<ProductAPIObject.Product_promos>> json;
    //     console.log(this.promos); // 1, "string", false
    //   }
    // });

    this.http.get('http://127.0.0.1/assalaam/api/promos').subscribe(json => {
      if (json === null) {
        console.log('JSON is null');
      } else {
        // console.log(json);
          this.promos = <Array<ProductAPIObject.Promo>>json;
          console.log(this.promos);
      }
    });
  }

  loadPromoImages() {
    this.http.get('http://127.0.0.1/assalaam/api/promos').subscribe(json => {
      if (json === null) {
        console.log('JSON is null');
      } else {
        // console.log(json);
          this.promos = <Array<ProductAPIObject.Promo>>json;
          console.log(this.promos);
      }
    });
  }

  searchInputCode(event: any) {
    /*
     | Make sure the barcode we process is only numeric strings
     */
    const BARCODE_REGEX: RegExp = /[0-9]\d*/g;

    if (event.key === 'Enter') {
      if (BARCODE_REGEX.test(event.target.value)) {
        return this.product.getProductInfo(event.target.value)
               ? this.router.navigateByUrl('/product').then(e => {
                 if (e) {
                   console.log('Routing success!');
                 } else {
                   console.log('Routing fails!');
                 }
               })
               : this.member.getMemberInfo(event.target.value);
      }
    }
  }
}
