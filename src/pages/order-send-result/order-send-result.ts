import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, MenuController } from 'ionic-angular';
import { RootPage } from '../root/root';

@IonicPage()
@Component({
  selector: 'page-order-send-result',
  templateUrl: 'order-send-result.html',
})
export class OrderSendResultPage {
  goods: any;
  cnt: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private app: App,
    private menuCtrl: MenuController
    ) {
    this.goods = navParams.get("item");
    this.cnt = navParams.get("cnt");
  }

  goPointHistory() {
    this.navCtrl.pop();
    this.app.getRootNav().setRoot('RootPage', {rootPage: 'PointHistoryPage'});
  }

  goHome() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderSendResultPage');
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(true);
  }

  ionViewDidLeave() {
    // 페이지가 종료될때
    console.log('ionViewDidLeave OrderSendResultPage');
  }
}