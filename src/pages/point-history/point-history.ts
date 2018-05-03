import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';

import * as moment from 'moment';
import { BtobMemberCreditUseHistoryProvider } from '../../providers/btob/btob-member-credit-use-history';
import { BtobLoginProvider } from '../../providers/btob/btob-login';
import { ResResult } from '../../models/res-result';

export interface PointHistoryInterface {
  datecreated: string;
  usePrice: string;
  orderCnt: string;
  cancelCnt: string;
  failCnt: string;
  afterCreditBalance: string;
  sumGroup :string;
}

@IonicPage()
@Component({
  selector: 'page-point-history',
  templateUrl: 'point-history.html',
})
export class PointHistoryPage {
  currDate = moment(new Date()).format('YYYY-MM-DD');
  startDate = this.currDate;
  endDate = this.currDate;

  resResult: ResResult;
  pointHistory: PointHistoryInterface[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private btobLoginProvider: BtobLoginProvider,
              private btobMemberCreditUseHistoryProvider: BtobMemberCreditUseHistoryProvider,
              private menuCtrl: MenuController,
              private alertCtrl: AlertController
            ) {
              this.menuCtrl.enable(true);
    //console.log(this.currDate);
  }

  setDate(type: string) {
    this.endDate = this.currDate;
    switch (type) {
      case 'T':
        this.startDate = this.currDate;
        break;
      case 'M1':
        this.startDate = moment(new Date()).add(-1, 'month').format('YYYY-MM-DD');
        break;
      case 'M3':
        this.startDate = moment(new Date()).add(-3, 'month').format('YYYY-MM-DD');
        break;
    }
  }

  getPointHistory() {
    this.btobMemberCreditUseHistoryProvider.getCreditUseHistory(
      this.btobLoginProvider.getLoginInfo().memberId,
      this.startDate,
      this.endDate
    )
    .subscribe((res: any) => {
      //console.log(res);
      if(res.result_code == 'APP_LINK_SUCCESS_S0000') {
        this.pointHistory = new Array();
        
        for(let i = 0; i < res.result_data.length; i++) {
          //console.log(res.result_data[i]);
          this.pointHistory.push(
            {
              datecreated: res.result_data[i].datecreated,
              usePrice: res.result_data[i].use_price,
              orderCnt: res.result_data[i].order_cnt,
              cancelCnt: res.result_data[i].cancel_cnt,
              failCnt: res.result_data[i].fail_cnt,
              afterCreditBalance: res.result_data[i].after_credit_balance,
              sumGroup: res.result_data[i].sum_group
            }
          );
        }
      } else {
        let alert = this.alertCtrl.create({
          title: this.resResult.getResCode(),
          subTitle: this.resResult.getResMsg(),
          buttons: ['확인']
        });
        alert.present();
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PointHistoryPage');
    //console.log(this.navCtrl.parent);
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(true);
  }
}