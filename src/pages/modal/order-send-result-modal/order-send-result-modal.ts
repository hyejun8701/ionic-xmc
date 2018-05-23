import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, MenuController, ToastController, ViewController } from 'ionic-angular';
import { BaseProvider } from '../../../providers/base-provider';

@IonicPage()
@Component({
  selector: 'page-order-send-result-modal',
  templateUrl: 'order-send-result-modal.html',
})
export class OrderSendResultModalPage {
  goods: any;
  cnt: any;
  
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private menuCtrl: MenuController,
              private viewCtrl: ViewController,
              private baseProvider: BaseProvider
              ) {
    this.goods = navParams.get("item");
    this.cnt = navParams.get("cnt");
  }

  goPointHistory() {
    this.baseProvider.setRootPage('PointHistoryPage');
    this.navCtrl.pop();
  }

  goHome() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderSendResultModalPage');
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(true);
  }

  ionViewDidLeave() {
    // 페이지가 종료될때
    console.log('ionViewDidLeave OrderSendResultModalPage');
  }
}