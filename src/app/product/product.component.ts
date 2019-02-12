import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Product, DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';


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
  _json: any;
  barcode: string;
  API_URL: string = 'http://192.168.0.62:8082/datasnap/rest/TPublicAPI/GetProduct/';

  constructor(private router: Router, private data: DataService, private route: ActivatedRoute, private http: HttpClient)  {
    this.product = new Product();
  }

  ngOnInit() {
    // this code if you scan your barcode
    this.route.data.subscribe(result => {
      this._json = result.json;
    });

    if (this._json == null) {
      // this code if you direct use url link 
      this.route.params.subscribe(params => {
        this.barcode = params['id'];

        // if this.route.param any exist
        // then this.product = <Product> the PARAM
        // else
        if ( this.barcode === '' ) {
          return;
        } else {
          this.loadProduct(); // it works if we directly use the url
          // this.data.getInformationById(this.barcode);
        }
      });
    } else {
      console.log('json is not null here');
      this.product = <Product> this._json;
    }

  }

  loadProduct() {
    this.http.get(this.API_URL + this.barcode).subscribe(json => {
      // console.log(this.barcode);

      if (json === null) {
          this.product = new Product();
          this.product.product_name = 'Not Found';

          this.router.navigateByUrl('/member/' + this.barcode);
        } else {
          this.product = <Product>json;

          let minUom: number = this.product.uoms[0].conversion;
          this.product.product_minuom = this.product.uoms[0].uom;

          /*
           | Loop trough the UOMS object array to find the corresponding
           | minimum conversion then assign the uom of that conversion to
           | the product_minuom of 'Product' so that we can display it to
           | the corresponding template.
           */
          this.product.uoms.forEach(element => {
            if (element.conversion < minUom) {
              minUom = element.conversion;
              this.product.product_minuom = element.uom;
            }
          });

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
      }
    );
  }

}
