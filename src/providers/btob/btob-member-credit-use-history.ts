import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseProvider } from '../base-provider';

@Injectable()
export class BtobMemberCreditUseHistoryProvider extends BaseProvider {

  constructor(public http: HttpClient) {
    super();
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
