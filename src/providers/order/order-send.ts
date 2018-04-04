import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class OrderSendProvider {
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

  orderSend(memberId: string, goodsId: string, receivermobiles: string, smsType: string, content: string) {
    return this.http.post(
      this.SERVER + '/orderSend.do',
      JSON.stringify(
        {
          'memberId': memberId,
          'goodsId': goodsId,
          'receivermobiles': receivermobiles,
          'sms_type': smsType,// 나중에 네이밍 변경 카멜
          'content': content
        }),
      {headers: this.headers}
    );
  }
}