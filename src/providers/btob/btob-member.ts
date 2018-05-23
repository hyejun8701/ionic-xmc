import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseProvider } from '../base-provider';

@Injectable()
export class BtobMemberProvider extends BaseProvider {
  
  constructor(public http: HttpClient) {
    super();
  }

  /* 비밀번호 분실요청 */
  lostPassword(memberId: string, memberName: string, chargeMobile: string) {
    console.log(JSON.stringify({'memberId': memberId, 'memberName': memberName, 'chargeMobile': chargeMobile}));

    return this.http.post(
      this.SERVER + '/lostPassword.do',
      JSON.stringify({'memberId': memberId, 'memberName': memberName, 'chargeMobile': chargeMobile}),
      {headers: this.headers}
    );
  }

  /* 비밀번호 변경 */
  renewPassword(memberId: string, password: string, newPassword: string) {
    return this.http.post(
      this.SERVER + '/renewPassword.do',
      JSON.stringify({'memberId': memberId, 'password': password, 'newPassword': newPassword}),
      {headers: this.headers}
    );
  }

  /* btob_member */
  getMemberInfo(memberId: string) {
    return this.http.post(
      this.SERVER + '/memberInfo.do',
      JSON.stringify({'memberId': memberId}),
      {headers: this.headers}
    );
  }
}