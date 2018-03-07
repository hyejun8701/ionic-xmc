import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-order-send-result',
  templateUrl: 'order-send-result.html',
})
export class OrderSendResultPage {
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
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