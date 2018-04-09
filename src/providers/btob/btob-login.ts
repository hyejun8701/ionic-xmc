import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BtobMember } from '../../models/btob-member';
import { BaseProvider } from '../base-provider';

@Injectable()
export class BtobLoginProvider extends BaseProvider {
  private btobMember: BtobMember;

  constructor(public http: HttpClient) {
    super();
  }
  
  authenticate(memberId: string, password: string) {
    return this.http.post(
      this.SERVER + '/login.do',
      JSON.stringify({'memberId': memberId, 'password': password}),
      {headers: this.headers}
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

  isLogin() {
    if(this.btobMember != null && this.btobMember != undefined) {
      return true;
    }
    return false;
  }

  logOut() {
    this.btobMember = null;
    localStorage.removeItem('rememberMe');
  }
}