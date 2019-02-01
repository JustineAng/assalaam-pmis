import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public product: Product;

  constructor(private http: HttpClient) {

  }

  getProductInfo(productID: string) {
    const API_URL: string = 'http://192.168.0.62:8082/datasnap/rest/TPublicAPI/GetProduct/';

    // return this.http.get(API_URL + productID) !== null
    //        ? this.http.get(API_URL + productID)
    //        : null;

    this.http.get(API_URL + productID).subscribe(json => {
      // this.product.product_name = json['product_name'] // manual

      this.product = <Product>json;
      this.product.product_barcode = productID;
      // console.log(this.product.product_name);
    });

    return this.product;
  }
}

interface IUOM {
  barcode: string;
  uom: string;
}

interface IProduct {
  product_name: string;
  uoms: Array<IUOM>;
}

export class Product implements IProduct {
  product_code: string;
  product_barcode: string;
  product_name: string;
  uoms: Array<UOM>;
}

export class UOM implements IUOM {
  barcode: string;
  uom: string;
}
