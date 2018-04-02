import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class BtobMemberCreditUseHistoryProvider {
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

  getCreditUseHistory(memberId: string, startDate: string, endDate: string) {
    startDate = startDate.replace(/[^0-9]/g, "");
    endDate = endDate.replace(/[^0-9]/g, "");
    return this.http.post(
      this.SERVER + '/pointUseHistory.do',
      JSON.stringify({'memberId': memberId, 'startDate': startDate, 'endDate': endDate}),
      {headers: this.headers}
    );
  }
}
