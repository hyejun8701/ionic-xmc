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
    //console.log('Hello LoginServiceProvider Provider');
    
    //this.SERVER = `${environment.HOST}`;
    this.headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });
  }
  
  authenticate(memberId: string, password: string): BtobMember {

    const params = {'memberId': memberId, 'password': password};
    
    this.http.post('/external' + '/login.do', JSON.stringify(params), {headers: this.headers})
    .subscribe((data: any) => {
      if(data.result_code == 'LINK_SUCCESS_S0000') {
        this.btobMember = new BtobMember();
        this.btobMember.memberName = data.result_msg.member_name;
        this.btobMember.point = data.result_msg.credit_balance;
      } else {
        this.btobMember = null;
      }
    },
    err => {
      console.log(err);
    });

    return this.btobMember
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
  }
}