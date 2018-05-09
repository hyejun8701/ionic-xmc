import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController } from 'ionic-angular';
import { OrderSendAuthProvider } from '../../../providers/order/order-send-auth';
import { OrderSendProvider } from '../../../providers/order/order-send';
import { BtobLoginProvider } from '../../../providers/btob/btob-login';
import { BtobMemberCreditProvider } from '../../../providers/btob/btob-member-credit';
import * as GlobalConstants from '../../../common/global-constants';

@IonicPage()
@Component({
  selector: 'page-order-send-modal',
  templateUrl: 'order-send-modal.html',
})
export class OrderSendModalPage {
  goods: any;
  receiverSetType: string;
  receivers: Array<string> = [];
  @ViewChild('myInput') myInput: ElementRef;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private modalCtrl: ModalController,
              private btobLoginProvider: BtobLoginProvider,
              private orderSendProvider: OrderSendProvider,
              private btobMemberCreditProvider: BtobMemberCreditProvider,
              private viewCtrl: ViewController,
              private alertCtrl: AlertController,
              private orderSendAuthProvider: OrderSendAuthProvider
            ) {
    this.goods = navParams.get("item");
  }

  createReceiverModal(type) {
    if(type != null && (this.receivers.length === GlobalConstants.RECEIVER_POSSIBLE_COUNT_DEFAULT)) {
      let alert = this.alertCtrl.create({
        subTitle: '수신자는 최대 10명 입니다.',
        buttons: [
          {
            text: '확인',
            handler: () => {
            }
          }
        ]
      });
      alert.present();
    } else {
      if(type == 'input') {
        let modal = this.modalCtrl.create('OrderReceiverInputModalPage', {receivers: this.receivers});
        modal.onDidDismiss(data => {
          if(data != null) {
            for(let i = 0; i < data.length; i++) {
              if(!data[i]) {
                continue;
              }
              this.receivers.push(data[i].replace(/\-/g, ''));
            }
          }
        });
        modal.present();
      } else if(type == 'address') {
        let modal = this.modalCtrl.create('OrderReceiverContactsModalPage', {receivers: this.receivers});
        modal.onDidDismiss(data => {// 추후 이름표시 요구 없을경우 onDidDismiss 를 input type modal 과 통합
          if(data != null) {
            for(let i = 0; i < data.length; i++) {
              if(!data[i]) {
                continue;
              }
              this.receivers.push(data[i].phoneNumber.replace(/\-/g, ''));
            }
          }
        });//
        modal.present();
      }
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

  orderSendA() {
    this.orderSendAuthProvider.orderSendAuth(
      this.btobLoginProvider.getLoginInfo().memberId
    ).subscribe((res: any) => {
      alert();
    }, (err: any) => {
      console.error('orderSEndAuth err!!');
      console.error(err)
      console.error(JSON.stringify(err));
      console.error(err.message)
    });
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
          this.btobLoginProvider.setCurrPointInfo(res.result_data.credit_balance - res.result_data.ready_credit);
        }
      });
    });

    let modal = this.modalCtrl.create('OrderSendResultModalPage', {item: this.goods, cnt: this.receivers.length});
    modal.present().then(() => {
      this.viewCtrl.dismiss();
    });
  }

  goBack() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderSendModalPage');
  }
}