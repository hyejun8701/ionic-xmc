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

    this.btobMember = new BtobMember();

    this.http.post('/external' + '/login.do', JSON.stringify(params), {headers: this.headers})
    .subscribe(data => {
      //console.log(data);
      Object.keys(data).forEach(key => {
        this.btobMember.memberName = data[key].member_name;
        this.btobMember.point = data[key].credit_balance;
      });
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
    return this.btobMember != null;
  }

  logOut() {
    this.btobMember = null;
  }
}