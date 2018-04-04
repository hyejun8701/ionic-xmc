import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-order-send-result',
  templateUrl: 'order-send-result.html',
})
export class OrderSendResultPage {
  goods: any;
  cnt: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.goods = navParams.get("item");
    this.cnt = navParams.get("cnt");
  }

  goPointHistory() {
    this.navCtrl.push('PointHistoryPage');
  }

  goHome() {
    this.navCtrl.push('GoodsListPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderSendResultPage');
  }

  ionViewDidLeave() {
    // 페이지가 종료될때
    console.log('ionViewDidLeave OrderSendResultPage');
  }
}