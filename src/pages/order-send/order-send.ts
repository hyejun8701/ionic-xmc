import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { OrderSendResultPage } from '../order-send-result/order-send-result';
import { OrderSendProvider } from '../../providers/order/order-send';
import { BtobLoginProvider } from '../../providers/btob/btob-login';
import { BtobMemberCreditProvider } from '../../providers/btob/btob-member-credit';

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
  @ViewChild('myInput') myInput: ElementRef;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              private btobLoginProvider: BtobLoginProvider,
              private orderSendProvider: OrderSendProvider,
              private btobMemberCreditProvider: BtobMemberCreditProvider
            ) {
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

  resize() {
      var element = this.myInput['_elementRef'].nativeElement.getElementsByClassName("text-input")[0];
      var scrollHeight = element.scrollHeight;
      element.style.height = scrollHeight + 'px';
      this.myInput['_elementRef'].nativeElement.style.height = (scrollHeight + 16) + 'px';
  }

  orderSend() {
      this.orderSendProvider.orderSend(
      this.btobLoginProvider.getLoginInfo().memberId,
      this.goods.goodsId,
      JSON.parse(JSON.stringify(this.receivers)),
      'Z',
      this.myInput['_value']
    ).subscribe((res: any) => {
      console.log(res);
      
      this.btobMemberCreditProvider.getPointInfo(this.btobLoginProvider.getLoginInfo().memberId)
      .subscribe((res: any) => {
        console.log(res);

        if(res.result_code == 'APP_LINK_SUCCESS_S0000') {
          this.btobLoginProvider.setCurrPointInfo(res.result_data.credit_balance);
        }
      });
    });

    this.navCtrl.push(OrderSendResultPage, {item: this.goods, cnt: this.receivers.length});
    //this.navCtrl.push('OrderSendPage', {item: goods});
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