import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as moment from 'moment';

export interface PointHistoryInterface {
  date: string;
  reasonType: string;
  cnt?: string;
  point: string;
  remain :string;
}

@IonicPage()
@Component({
  selector: 'page-point-history',
  templateUrl: 'point-history.html',
})
export class PointHistoryPage {
  currDate = moment(new Date()).format('YYYY-MM-DD');
  sch = {
    startDate: this.currDate,
    endDate: this.currDate
  }

  pointHistory: PointHistoryInterface[] = [
    {date: "2017.06.01", reasonType: "OP", cnt: "1", point: "-1000", remain: "3000"},
    {date: "2017.06.01", reasonType: "OP", cnt: "1", point: "-1000", remain: "4000"},
    {date: "2017.06.01", reasonType: "OP", cnt: "1", point: "-1000", remain: "5000"},
    {date: "2017.06.01", reasonType: "OP", cnt: "1", point: "-1000", remain: "6000"},
    {date: "2017.06.01", reasonType: "OP", cnt: "1", point: "-1000", remain: "7000"},
    {date: "2017.06.01", reasonType: "OP", cnt: "1", point: "-1000", remain: "8000"},
    {date: "2017.06.01", reasonType: "OP", cnt: "1", point: "-1000", remain: "9000"}
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //console.log(this.currDate);
  }

  setDate(type: string) {
    this.sch.endDate = this.currDate;
    switch (type) {
      case 'T':
        this.sch.startDate = this.currDate;
        break;
      case 'M1':
        this.sch.startDate = moment(new Date()).add(-1, 'month').format('YYYY-MM-DD');
        break;
      case 'M3':
        this.sch.startDate = moment(new Date()).add(-3, 'month').format('YYYY-MM-DD');
        break;
    }
  }

  schHistory() {
    alert('나중에 서비스에서 api 호출....');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PointHistoryPage');
    //console.log(this.navCtrl.parent);
  }
}