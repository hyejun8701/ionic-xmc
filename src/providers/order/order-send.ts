import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseProvider } from '../base-provider';

@Injectable()
export class OrderSendProvider extends BaseProvider {

  constructor(public http: HttpClient) {
    super();  
  }

  orderSend(memberId: string, goodsId: string, receivermobiles: string, smsType: string, content: string) {
    return this.http.post(
      this.SERVER + '/orderSend.do',
      JSON.stringify(
        {
          'memberId': memberId,
          'goodsId': goodsId,
          'receivermobiles': receivermobiles,
          'smsType': smsType,
          'content': content
        }),
      {headers: this.headers}
    );
  }
}