import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Routes, ActivatedRoute } from '@angular/router/';
import { formatNumber } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

/**
 * Data Service Class
 */
export class DataService {

  public product: Product;

  constructor(private http: HttpClient) { }

  /**
   * Get Product Information
   *
   * Retrieves the product information of the given barcode from the
   * database.
   *
   * @param barcode string  A unique numeric identifier for the product.
   * @returns instance of `Product Class`.
   */
  getProductInfo(barcode: string): Product {
    const API_URL: string = 'http://192.168.0.62:8082/datasnap/rest/TPublicAPI/GetProduct/';

    this.http.get(API_URL + barcode).subscribe(json => {
      this.product = <Product>json;
    });

    // this.product.uoms.forEach(function(element) {
    //   if (element.barcode === barcode) {
    //     this.product_uom = element.barcode;
    //     this.product_price = element.price;
    //   }

    //   console.log(element);
    // });

    return this.product;
  }

  getMemberInfo() { }
}

interface IUom {
  uom: string;
  barcode: string;
  price: number;
}

interface IProduct {
  product_name: string;
  uoms: Array<IUom>;
}

interface IDiscByQty {
  qty_from: number;
  qty_to: number;
  price: number;
  barcode: string;
  uom: string;
}

export class Product implements IProduct {
  product_code: string;
  product_name: string;
  product_uom: string;
  product_price: string;
  uoms: Array<IUom>;
  disc_by_qty: Array<IDiscByQty>;
}

export class Uom implements IUom {
  uom: string;
  barcode: string;
  price: number;
}

export class Disc_by_qty implements IDiscByQty {
  qty_from: number;
  qty_to: number;
  price: number;
  barcode: string;
  uom: string;
}
