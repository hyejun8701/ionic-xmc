import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseProvider } from '../base-provider';

@Injectable()
export class AuthProvider extends BaseProvider {
  constructor(public http: HttpClient) {
    super();
  }

  auth(memberId: string, reqType: string, authNum: string) {
    return this.http.post(
      this.SERVER + '/auth.do',
      JSON.stringify(
        {
          'memberId': memberId,
          'reqType': reqType,
          'authNum': authNum
        }),
      {headers: this.headers}
    );
  }
}