import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BtobMember } from '../../models/btob-member';
import { environment } from '../../environments/environment';

@Injectable()
export class LoginServiceProvider {
  private SERVER: string;
  private headers: HttpHeaders;

  private btobMember: BtobMember;

  constructor(public http: HttpClient) {
    console.log('Hello LoginServiceProvider Provider');
    
    this.SERVER = `${environment.HOST}`;
    this.headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });
  }
  
  authenticate(memberId: string, password: string) {
    return this.http.post(this.SERVER + '/login.do', JSON.stringify({'memberId': memberId, 'password': password}), {headers: this.headers});
  }

  setLoginInfo(btobMember: BtobMember) {
    this.btobMember = btobMember;
  }

  getLoginInfo() {
    return this.btobMember;
  }

  isLogin() {
    if(this.btobMember != null && this.btobMember != undefined) {
      return true;
    }
    return false;
  }

  logOut() {
    this.btobMember = null;
    localStorage.setItem('isLogOut', 'Y');
  }
}