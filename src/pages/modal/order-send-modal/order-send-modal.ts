import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController } from 'ionic-angular';
import { OrderSendProvider } from '../../../providers/order/order-send';
import { BtobLoginProvider } from '../../../providers/btob/btob-login';
import { BtobMemberCreditProvider } from '../../../providers/btob/btob-member-credit';

import { CallNumber } from '@ionic-native/call-number';
import { Contacts } from '@ionic-native/contacts';

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
              private callNumber: CallNumber,
              private contacts: Contacts
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
    } else if(type == 'address') {
      console.log(this.contacts.find(["*"]));
      alert(this.contacts.find(["*"]));
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
    if(this.receivers.length > 0) { 
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
    } else {
      let alert = this.alertCtrl.create({
        //title: '비밀번호요청결과',
        subTitle: '수신자를 입력하세요',
        buttons: [
          {text: '확인'}
        ]
      });
      
      alert.present();
    }
  }

  goBack() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderSendModalPage');
  }

}
