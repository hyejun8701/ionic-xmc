import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { OrderReceiverInputModalPage } from '../order-receiver-input-modal/order-receiver-input-modal';
import { OrderSendResultPage } from '../order-send-result/order-send-result';

@IonicPage()
@Component({
  selector: 'page-order-send',
  templateUrl: 'order-send.html',
})
export class OrderSendPage {
  goods: any;
  receiverSetType: string;
  receivers: Array<string> = [];
  rootActive: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.goods = navParams.get("item");
    console.log(this.goods);
  }

  createReceiverModal(type) {
    console.log(type);
    if(type == 'input') {
      let modal = this.modalCtrl.create(OrderReceiverInputModalPage);
      modal.onDidDismiss(data => {
        if(data != null) {
          for(let i = 0; i < data.length; i++) {
            if(!data[i]) {
              continue;
            }
            this.receivers.push(data[i]);
          }
        }
      });
      modal.present();
    }
  }

  receiverRemove(i) {
    this.receivers.splice(i , 1);
  }

  orderSend() {
    this.navCtrl.setRoot(OrderSendResultPage);
    this.rootActive = true;
  }

  goBack() {
    this.navCtrl.popToRoot();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderSendPage');
  }

  ionViewWillLeave() {
    // 페이지가 닫힐때
    console.log('ionViewWillLeave OrderSendPage');
  }

  ionViewDidLeave() {
    // 페이지가 종료될때
    console.log('ionViewDidLeave OrderSendPage');
  }

  ionViewDidEnter() {
    console.log("ionViewDidEnter ");
  }

  ionViewWillUnload() {
    // 페이지가 삭제될때
    console.log('ionViewWillUnload OrderSendPage');
  }
}