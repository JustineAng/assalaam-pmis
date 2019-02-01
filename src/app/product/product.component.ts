import { Component, OnInit } from '@angular/core';
// import { Product, ProductService } from '../product.service';
import { Product, DataService } from '../data.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  // productBarcode: string = '';
  // productName: string = '';
  // unitOfMeasurement: string = '';
  // priceInRupiah: string = '0.000';
  product: Product;

  constructor(data: DataService)  {
    this.product = data.product;
    // console.log('product :' + data.product.product_name);
    // console.log('product:');
    console.log(this.product);
  }

  ngOnInit() {
  }
}
