import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseProvider } from '../base-provider';

@Injectable()
export class BtobEventGoodsProvider extends BaseProvider {
  constructor(public http: HttpClient) {
    super();
  }

  /* 간편발송 이벤트 상품리스트 */
  getEventGoodsList(memberId: string) {
    return this.http.post(
      this.SERVER + '/eventGoodsList.do',
      JSON.stringify({'memberId': memberId}),
      {headers: this.headers}
    );
  }
}