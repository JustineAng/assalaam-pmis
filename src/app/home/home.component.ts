import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from '../product.service';
import { MemberService } from '../member.service';
// import { AboutComponent } from '../about/about.component';
// import * as fs from 'file-system';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private assetsFolder = '../assets/img/promos';
  promoImageArray: any;
  mobile: boolean = false;

  constructor(private product: ProductService,
              private member: MemberService,
              private router: Router) { }

  ngOnInit() {
    if (window.screen.width <= 768) { // 768px portrait
      this.mobile = true;
    }

    // this.router.navigate(['product']);
    // const fileSystem = require('fs');

    // fileSystem.readdir(this.assetsFolder,(error, files) => {
    //   files.forEach(file => {
    //     this.promoImageArray.push(file);
    //   });
    // });

    // // fs.readdir(this.assetsFolder, (error, files) => {
    // //   files.forEach(file => {
    // //     this.promoImageArray.push(file);
    // //   });
    // // });
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
