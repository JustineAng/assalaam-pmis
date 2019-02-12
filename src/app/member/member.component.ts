import { Component, OnInit } from '@angular/core';
import { Member, DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {

  member: Member;
  barcode: string;
  API_URL: string = 'http://192.168.0.62:8082/datasnap/rest/TPublicAPI/GetMember/';

  constructor(private router: Router, private data: DataService, private route: ActivatedRoute, private http: HttpClient) {
    this.member = new Member();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.barcode = params['id'];

      // if this.route.param any exist
      // then this.product = <Product> the PARAM
      // else
      this.loadMember(); // it works if we directly use the url
    });
  }

  loadMember() {
    this.http.get(this.API_URL + this.barcode).subscribe(json => {
      // console.log(this.barcode);

      if (json === null) {
          this.member = new Member();
          this.member.name = 'Not Found';

          // this.router.navigateByUrl('/member/' + this.barcode);
        } else {
          this.member = <Member>json;

          setTimeout(() => {
            this.router.navigate(['']);
          }, 30000); // display for 30 seconds
        }

      },
      error => {
        console.log(error);
      }
    );
  }
}
