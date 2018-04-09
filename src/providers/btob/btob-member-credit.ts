import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseProvider } from '../base-provider';

@Injectable()
export class BtobMemberCreditProvider extends BaseProvider {

  constructor(public http: HttpClient) {
    super();
  }

  getPointInfo(memberId: string) {
    return this.http.post(
      this.SERVER + '/pointInfo.do',
      JSON.stringify({'memberId': memberId}),
      {headers: this.headers}
    );
  }
}