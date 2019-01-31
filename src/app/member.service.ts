import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor() { }

  getMemberInfo(memberID: string) {
    /*
     | If the length of the entered member code is greater than
     | or equal to 8, try to search for the member.
     */
    if (memberID === '123456') {
      console.log('Member');
    }

    return null;
  }
}
