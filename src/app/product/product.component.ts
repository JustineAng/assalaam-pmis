import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
// import { Product, ProductService } from '../product.service';
import { Product, DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product: Product;
  barcode: string;
  API_URL: string = 'http://192.168.0.62:8082/datasnap/rest/TPublicAPI/GetProduct/';

  constructor(private data: DataService, private route: ActivatedRoute, private http: HttpClient)  {
    this.product = new Product();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.barcode = params['id'];
      this.loadProduct();
    });
  }

  loadProduct() {
    this.http.get(this.API_URL + this.barcode).subscribe(json => {
      console.log(this.barcode);

      if (json === null) {
          this.product = new Product();
          this.product.product_name = 'Not Found';
        } else {
          this.product = <Product>json;

          /*
           | Loop trough the UOMS object array to find the corresponding
           | price of the scanned product, asign it to the product object
           | instance and remove it from the UOMS array so that we only
           | display the other UOMs not including the UOM of the scanned
           | product.
           */
          this.product.uoms.forEach(element => {
            if (element.barcode === this.barcode) {
              this.product.product_price = element.price;
              this.product.product_uom = element.uom;

              // Remove the scanned UOM from the UOMs object array.
              this.product.uoms.splice(this.product.uoms.indexOf(element), 1);
            }
          });
        }

      },
      error => {
        console.log(error);
        // return null;
      }
    );
  }

}
