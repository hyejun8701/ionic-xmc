import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BtobMember } from '../../models/btob-member';
import { BaseProvider } from '../base-provider';

@Injectable()
export class BtobLoginProvider extends BaseProvider {
  private btobMember: BtobMember;

  constructor(public http: HttpClient) {
    super();
  }
  
  authenticate(memberId: string, password: string, loginType: string) {
    let headers: HttpHeaders;

    if(loginType === 'A') {// 자동 로그인일 경우 refresh 토큰 헤더에 추가
      headers = this.headers.append('refreshToken', localStorage.getItem('refreshToken'));
    } else {
      headers = this.headers;
    }
    
    return this.http.post(
      this.SERVER + '/login.do',
      JSON.stringify({'memberId': memberId, 'password': password, 'loginType': loginType}),
      {headers: headers}
    );
  }

  setLoginInfo(btobMember: BtobMember) {
    this.btobMember = btobMember;
  }

  getLoginInfo() {
    return this.btobMember;
  }

  setCurrPointInfo(point: any) {
    this.btobMember.point = point;
  }

  getCurrPointInfo(): number {
    return this.btobMember.point;
  }

  isLogin() {
    if(this.btobMember != null && this.btobMember != undefined) {
      return true;
    }
    return false;
  }

  logOut() {
    this.btobMember = null;
    localStorage.removeItem('rememberMe');
    localStorage.removeItem('refreshToken');
  }
}