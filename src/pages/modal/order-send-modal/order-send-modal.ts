import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController } from 'ionic-angular';
import { OrderSendAuthProvider } from '../../../providers/order/order-send-auth';
import { OrderSendProvider } from '../../../providers/order/order-send';
import { BtobLoginProvider } from '../../../providers/btob/btob-login';
import { BtobMemberCreditProvider } from '../../../providers/btob/btob-member-credit';
import * as GlobalConstants from '../../../common/global-constants';
import * as CommonMessageKo from '../../../common/common-message-ko';
import { BasePage } from '../../base-page';
import { ResResult } from '../../../models/res-result';

@IonicPage()
@Component({
  selector: 'page-order-send-modal',
  templateUrl: 'order-send-modal.html',
})
export class OrderSendModalPage {
  resResult: ResResult;
  goods: any;
  receiverSetType: string;
  receivers: Array<string> = [];
  @ViewChild('myInput') myInput: ElementRef;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private btobLoginProvider: BtobLoginProvider,
              private orderSendProvider: OrderSendProvider,
              private btobMemberCreditProvider: BtobMemberCreditProvider,
              private viewCtrl: ViewController,
              private orderSendAuthProvider: OrderSendAuthProvider,
              private modalCtrl: ModalController,
              private alertCtrl: AlertController
            ) {
    //super(alertCtrl);
    this.goods = navParams.get("item");
  }

  createReceiverModal(type) {
    if(type != null && (this.receivers.length === GlobalConstants.RECEIVER_POSSIBLE_COUNT_DEFAULT)) {
      let alert = this.alertCtrl.create({
        subTitle: CommonMessageKo.MSG_MAXIMUM_NUMBER_OF_RECIPIENTS_WRONG,
        buttons: [
          {
            text: CommonMessageKo.MSG_CHECK_OK,
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

  orderSendAuth() {
    if(this.receivers.length > 0) {
      this.orderSendAuthProvider.orderSendAuth(
        this.btobLoginProvider.getLoginInfo().memberId,
        'C',
        ''
      ).subscribe((res: any) => {
        console.log(res)
        if(res.result_code == 'APP_LINK_SUCCESS_S0000') {
          let alert = this.alertCtrl.create({
            subTitle: '인증번호를 입력하세요.<br/>(2분30초 이내)',
            inputs: [
              {type: 'text', name: 'authNum', placeholder: '인증번호'}
            ],
            buttons: [
              {
                text: CommonMessageKo.MSG_CHECK_OK,
                handler: data => {
                console.log('Input data:', data);
                if(!data.authNum) {
                  return false;
                } else {
                  this.orderSendAuthProvider.orderSendAuth(
                    this.btobLoginProvider.getLoginInfo().memberId,
                    'V',
                    data.authNum
                  ).subscribe((res: any) => {
                    this.resResult = new ResResult(res);

                    if(res.result_code == 'APP_LINK_SUCCESS_S0000') {
                      this.orderSend();
                    } else {
                      let alert = this.alertCtrl.create({
                        title: '인증실패',
                        subTitle: this.resResult.getResMsg(),
                        buttons: [CommonMessageKo.MSG_CHECK_OK]
                      });
                      alert.present();
                    }
                  });
                }
              }
            }]
          });
          alert.present();
        }
      }, err => {
        console.error(JSON.stringify(err));
      });
    } else {
      let alert = this.alertCtrl.create({
        subTitle: '수신자를 입력하세요.',
        buttons: [
          {text: CommonMessageKo.MSG_CHECK_OK}
        ]
      });
      
      alert.present();
    }
  }

  orderSend() {
    this.orderSendProvider.orderSend(
      this.btobLoginProvider.getLoginInfo().memberId,
      this.goods.goodsId,
      JSON.parse(JSON.stringify(this.receivers)),
      'Z',
      this.myInput['_value']
    ).subscribe((res: any) => {
      this.resResult = new ResResult(res);

      if(res.result_code == 'APP_LINK_SUCCESS_S0000') {
        let modal = this.modalCtrl.create('OrderSendResultModalPage', {item: this.goods, cnt: this.receivers.length});
        modal.present().then(() => {
          this.viewCtrl.dismiss();
        });
        
        this.btobMemberCreditProvider.getPointInfo(this.btobLoginProvider.getLoginInfo().memberId)
        .subscribe((res: any) => {
          console.log(res);
          
          if(res.result_code == 'APP_LINK_SUCCESS_S0000') {
            this.btobLoginProvider.setCurrPointInfo(res.result_data.credit_balance - res.result_data.ready_credit);
          }
        });
      } else {
        let alert = this.alertCtrl.create({
          title: '발송실패',
          subTitle: this.resResult.getResMsg(),
          buttons: [CommonMessageKo.MSG_CHECK_OK]
        });
        alert.present();
      }
    });
  }

  goBack() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderSendModalPage');
  }
}