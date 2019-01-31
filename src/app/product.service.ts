import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProductInfo(productID: string) {
    const API_URL: string = 'http://192.168.0.62:8082/datasnap/rest/TPublicAPI/GetProduct/';

    return this.http.get(API_URL + productID) !== null
           ? this.http.get(API_URL + productID)
           : null;
  }
}
