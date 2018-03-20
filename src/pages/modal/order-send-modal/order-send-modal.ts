import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-order-send-modal',
  templateUrl: 'order-send-modal.html',
})
export class OrderSendModalPage {
  goods: any;
  receiverSetType: string;
  receivers: Array<string> = [];
  rootActive: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController) {
    this.goods = navParams.get("item");
    console.log(this.goods);
  }

  createReceiverModal(type) {
    console.log(type);
    if(type == 'input') {
      let modal = this.modalCtrl.create('OrderReceiverInputModalPage');
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
    this.navCtrl.setRoot('OrderSendResultPage');
    this.rootActive = true;
  }

  goBack() {
    this.navCtrl.popToRoot();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderSendModalPage');
  }

}
