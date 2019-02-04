import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DataService } from '../data.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  /**
   * Contains the application that is shown on the navigation bar
   * of the application as Navigation Brand.
   *
   * @var string
   */
  appTitle: string = 'ASSALAAM HYPERMARKET';

  /**
   * NavComponent class constructor.
   *
   * @param router Provides the navigation and url manipulation capabilities.
   * @param route Contains the information about a route associated with the component.
   * @param data Provides the information for the product or member.
   */
  constructor(private router: Router,
              private route: ActivatedRoute,
              private data: DataService) { }

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
  searchInputCode(event: any) {
    /*
     | Barcode Regex
     |
     | Ensures that the barcode we are scanning is only numeric charcaters
     | with no limit on its length.
     */
    const BARCODE_REGEX: RegExp = /[0-9]\d*/g;

    if (event.key === 'Enter') {
      if (BARCODE_REGEX.test(event.target.value)) {
        this.router.navigateByUrl('/product/' + event.target.value);
        event.target.value = '';
      }
    }
  }
}
