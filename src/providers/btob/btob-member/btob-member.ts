import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class BtobMemberProvider {
  private SERVER: string;
  private headers: HttpHeaders;

  constructor(public http: HttpClient) {
    console.log('Hello BtobMemberProvider Provider');
    this.SERVER = `${environment.HOST}`;
    this.headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });
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
}