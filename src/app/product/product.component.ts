import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  productBarcode: string = '';
  productName: string = '';
  unitOfMeasurement: string = '';
  priceInRupiah: string = '0.000';

  constructor() { }

  ngOnInit() {
  }

}
