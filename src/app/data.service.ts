import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/**
 * Data Service Class
 */
export class DataService {

  public product: Product;
  public member: Member;

  public timeOut: number = 0;
  public timeOutID: any;

  public PRODUCT_API_URL: string = 'http://192.168.0.242:8081/datasnap/rest/TPublicAPI/GetProduct/';
  public MEMBER_API_URL: string = 'http://192.168.0.242:8081/datasnap/rest/TPublicAPI/GetMember/';


  constructor(private http: HttpClient) { }
}

export class Product implements ProductAPIModel.IProduct {
  product_code: string;
  product_uom: string;
  product_price: number;
  prodcut_image: string;
  product_minuom: string;
  sproduct_conversion: number;

  product_name: string;
  uoms: Array<ProductAPIModel.IUom>;
  promo_info: Array<ProductAPIModel.IPromoInfo>;
  disc_by_qty: Array<ProductAPIModel.IDiscByQty>;
}

export class Uom implements ProductAPIModel.IUom {
  uom: string;
  barcode: string;
  price: number;
  conversion: any;
}

export class Promo_info implements ProductAPIModel.IPromoInfo {
  info: string;
}

export class Disc_by_qty implements ProductAPIModel.IDiscByQty {
  qty_from: number;
  qty_to: number;
  price: number;
  barcode: string;
  uom: string;
}

export class Member implements MemberAPIModel.IMember {
  card_no: string;
  name: string;
  address: string;
  member_type: string;
  point: number;
  coupon: number;
  identity_no: string;
  phone: string;
  point_valid_until: string;
}
