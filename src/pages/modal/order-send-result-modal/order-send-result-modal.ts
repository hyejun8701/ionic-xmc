import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, MenuController } from 'ionic-angular';

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
              private app: App,
              private menuCtrl: MenuController
              ) {
    this.goods = navParams.get("item");
    this.cnt = navParams.get("cnt");
  }

  goPointHistory() {
    this.app.getRootNav().setRoot('RootPage', {rootPage: 'PointHistoryPage'});
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
