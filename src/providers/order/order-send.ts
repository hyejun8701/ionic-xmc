import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseProvider } from '../base-provider';
import * as GlobalConstants from '../../common/global-constants';

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
          'title': GlobalConstants.ORDER_SEND_MSG_TITLE,
          'content': content
        }),
      {headers: this.headers}
    );
  }
}