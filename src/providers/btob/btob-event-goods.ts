import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class BtobEventGoodsProvider {
  private SERVER: string;
  private headers: HttpHeaders;

  constructor(public http: HttpClient) {
    this.SERVER = `${environment.HOST}`;
    this.headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });
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