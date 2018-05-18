import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController, Refresher} from 'ionic-angular';

import * as moment from 'moment';
import { BtobMemberCreditUseHistoryProvider } from '../../providers/btob/btob-member-credit-use-history';
import { BtobLoginProvider } from '../../providers/btob/btob-login';
import { ResResult } from '../../models/res-result';
import { BasePage } from '../base-page';
import * as CommonTextsKo from '../../common/common-texts-ko';

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
export class PointHistoryPage extends BasePage {
  currDate = moment(new Date()).format('YYYY-MM-DD');
  startDate = this.currDate;
  endDate = this.currDate;

  resResult: ResResult;
  pointHistory: PointHistoryInterface[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private btobLoginProvider: BtobLoginProvider,
              private btobMemberCreditUseHistoryProvider: BtobMemberCreditUseHistoryProvider, private menuCtrl: MenuController,
              private alertCtrl: AlertController
            ) {
    super(alertCtrl);
    this.menuCtrl.enable(true);
  }

  doRefresh(refresher: Refresher) {
    if(this.btobLoginProvider.isLogin()) {
      this.getPointHistory();
      console.log('get point history..');
              
      setTimeout(() => {
        refresher.complete();
      }, 1000);
    }
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
    ).subscribe((res: any) => {
      this.resResult = new ResResult(res);

      if(res.result_code == 'APP_LINK_SUCCESS_S0000') {
        this.pointHistory = new Array();
        
        for(let i = 0; i < res.result_data.length; i++) {
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
        this.alert(CommonTextsKo.LBL_GET_LIST_FAILED, this.resResult.getResMsg());
      }
    });
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(true);
    console.log('ionViewDidEnter PointHistoryPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PointHistoryPage');
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave PointHistoryPage');
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave PointHistoryPage');
  }

  ionViewWillUnload() {
    console.log('ionViewWillUnload PointHistoryPage');
  }
}