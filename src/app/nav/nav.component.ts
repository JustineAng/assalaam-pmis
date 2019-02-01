import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DataService } from '../data.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  appTitle: string = 'ASSALAAM HYPERMARKET';
  constructor(private router: Router,
              private route: ActivatedRoute,
              private data: DataService) { }

  ngOnInit() { }

  searchInputCode(event: any) {
    const BARCODE_REGEX: RegExp = /[0-9]\d*/g;

    console.log('Pressed Key: ' + event.key);

    if (event.key === 'Enter') {
      if (BARCODE_REGEX.test(event.target.value)) {

        this.data.getProductInfo(event.target.value)
        ? this.router.navigateByUrl('/product/' + event.target.value).then(e => {
            if (e) {
              console.log('Successfully routed to the product component.');
            } else {
              console.log('Routing to product component fails.');
            }
          })
        : this.data.getMemberInfo();

        // if (this.data.getProductInfo(event.target.value)) {
        //   this.router.navigateByUrl('/product/' + event.target.value).then(e => {
        //     if (e) {
        //       console.log('Successfully routed to the product component.');
        //     } else {
        //       console.log('Routing to product component fails.');
        //     }
        //   });
        // } else {
        //   this.router.navigateByUrl('/member/' + event.target.value).then(e => {
        //     if (e) {
        //       console.log('Successfully routed to the member component.');
        //     } else {
        //       console.log('Routing to member component fails.');
        //     }
        //   });
        // }

        event.target.value = '';
      }
    }
  }
}
