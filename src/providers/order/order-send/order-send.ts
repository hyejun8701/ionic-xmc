import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

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

  orderSend(memberId: string, password: string) {
    return this.http.post(
      this.SERVER + '/orderSend.do',
      JSON.stringify({'memberId': memberId, 'password': password}),
      {headers: this.headers}
    );
  }
}