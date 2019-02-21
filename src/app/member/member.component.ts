import { Component, OnInit } from '@angular/core';
import { Member, DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CountdownModule } from 'ngx-countdown';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {

  member: Member;
  barcode: string;
  mobile: boolean = false;
  time: number;
  API_URL: string = 'http://192.168.0.62:8082/datasnap/rest/TPublicAPI/GetMember/';

  constructor(private router: Router, private data: DataService, private route: ActivatedRoute, private http: HttpClient) {
    this.member = new Member();
  }

  ngOnInit() {
    if (window.screen.width <= 768) { // 768px portrait
      this.mobile = true;
    }

    this.route.params.subscribe(params => {
      this.barcode = params['id'];

      // if this.route.param any exist
      // then this.product = <Product> the PARAM
      // else
      this.loadMember(); // it works if we directly use the url

      // clear out the previous timeout id so we don't use it.
      clearTimeout(this.data.timeOutID);

      // set the timeout before we direct it to the home component.
      this.data.timeOut = 10000;
      this.time = this.data.timeOut / 1000;

      this.data.timeOutID = setTimeout(() => {
        this.router.navigate(['']);
      }, this.data.timeOut);
    });
  }

  loadMember() {
    this.http.get(this.data.MEMBER_API_URL + this.barcode).subscribe(json => {
      // console.log(this.barcode);

      if (json === null) {
          this.member = new Member();
          this.member.name = 'Not Found';

          // this.router.navigateByUrl('/member/' + this.barcode);
        } else {
          this.member = <Member>json;
        }

      },
      error => {
        console.log(error);
      }
    );
  }
}
