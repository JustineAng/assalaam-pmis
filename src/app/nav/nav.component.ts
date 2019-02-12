import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DataService, Product, Member } from '../data.service';
import { HttpClient } from '@angular/common/http';
import Quagga from 'quagga';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
/**
 * Class NavComponent
 *
 * This class provides the business logic for the navigation control
 * of the application including the business logic for scanning if the
 * barcode is in the correct format as well as the logic for calling
 * the product and member search method.
 */
export class NavComponent implements OnInit {

  /**
   * Contains the application that is shown on the navigation bar
   * of the application as Navigation Brand.
   *
   * @var string
   */
  appTitle: string = 'ASSALAAM HYPERMARKET';

  /*
   | Barcode Regex
   |
   | Ensures that the barcode we are scanning is only numeric charcaters
   | with no limit on its length.
   */
  private BARCODE_REGEX: RegExp = /^\*\d+$|^\d+$/;

  /**
   * NavComponent class constructor.
   *
   * @param router Provides the navigation and url manipulation capabilities.
   * @param route Contains the information about a route associated with the component.
   * @param data Provides the information for the product or member.
   */
  constructor(private router: Router,
              private route: ActivatedRoute,
              private data: DataService,
              private http: HttpClient) { }

  ngOnInit() { }

  /**
   * Search Input Code
   *
   * Search for product or member from the database and display it to
   * the customer. This method is triggered by default everytime the
   * return key is pressed on the input textbox.
   *
   * @param event an event that triggers the calling of this method.
   */

  checkProduct(barcode: String) {
    this.http.get(this.data.PRODUCT_API_URL + barcode).subscribe(json => {
      if (json === null) {
        // check member api
        this.checkMember(barcode);
      } else {
        console.log(json);
        this.router.navigate(['/product/' + barcode], json); // temporary
      }
    });
  }

  checkMember(barcode: String) {
    this.http.get(this.data.MEMBER_API_URL + barcode).subscribe(json => {
      if (json === null) {
        // navigate to not found page
        console.log('not found');
      } else {
        this.router.navigateByUrl('/member/' + barcode); // temporary
      }
    });
  }

  searchInputCode(event: any) {

    if (event.key === 'Enter') {
      if (this.BARCODE_REGEX.test(event.target.value)) {
        let _barcode: string = event.target.value;

        // Check if we have an asterisk at the beginning of the input, then
        // we strip it from the string before the searching begin.
        if (_barcode.charAt(0) === '*') {
          _barcode = _barcode.substring(1);
        }

        // this.router.navigateByUrl('/product/' + _barcode);
        this.checkProduct(_barcode);
        event.target.value = '';
      }
    }
  }
}
