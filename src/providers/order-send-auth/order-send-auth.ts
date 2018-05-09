import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseProvider } from '../base-provider';

@Injectable()
export class OrderSendAuthProvider extends BaseProvider {

  constructor(public http: HttpClient) {
    super();
    console.log('Hello OrderSendAuthProvider Provider');
  }

  orderSendAuth(memberId: string) {
    return this.http.post(
      this.SERVER + '/orderSendAuth.do',
      JSON.stringify(
        {
          'memberId': memberId
        }),
      {headers: this.headers}
    );
  }
}