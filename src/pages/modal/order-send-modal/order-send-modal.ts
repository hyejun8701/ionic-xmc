import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController, Refresher, ToastController, LoadingController, App } from 'ionic-angular';
import { OrderSendAuthProvider } from '../../../providers/order/order-send-auth';
import { OrderSendProvider } from '../../../providers/order/order-send';
import { BtobLoginProvider } from '../../../providers/btob/btob-login';
import { BtobMemberCreditProvider } from '../../../providers/btob/btob-member-credit';
import * as GlobalConstants from '../../../common/global-constants';
import * as CommonTextsKo from '../../../common/common-texts-ko';
import { BasePage } from '../../base-page';
import { ResResult } from '../../../models/res-result';

@IonicPage()
@Component({
  selector: 'page-order-send-modal',
  templateUrl: 'order-send-modal.html',
})
export class OrderSendModalPage extends BasePage {
  resResult: ResResult;
  goods: any;
  receiverSetType: string;
  receivers: Array<string> = [];
  @ViewChild('myInput') myInput: ElementRef;
  myPoint: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private btobLoginProvider: BtobLoginProvider,
              private orderSendProvider: OrderSendProvider,
              private btobMemberCreditProvider: BtobMemberCreditProvider,
              private viewCtrl: ViewController,
              private orderSendAuthProvider: OrderSendAuthProvider,
              private modalCtrl: ModalController,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              private app: App
            ) {
    super(alertCtrl);
    this.goods = navParams.get("item");

    this.refreshPointInfo();
  }

  createReceiverModal(type) {
    if(type != null && (this.receivers.length === GlobalConstants.RECEIVER_POSSIBLE_COUNT_DEFAULT)) {
      this.alert(CommonTextsKo.MSG_MAXIMUM_NUMBER_OF_RECIPIENTS_WRONG);
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
    let modal = this.modalCtrl.create('OrderSendResultModalPage', {item: this.goods, cnt: this.receivers.length});
    
    if(this.receivers.length > 0) {
      let confrim = this.alertCtrl.create({
        title : CommonTextsKo.MSG_WANT_TO_PROCEED,
        buttons : [
          {text : CommonTextsKo.LBL_OK,
            handler: () => {
              this.orderSendAuthProvider.orderSendAuth(
                this.btobLoginProvider.getLoginInfo().memberId,
                'C',
                ''
              ).subscribe((res: any) => {
                console.log(res)
                
                if(res.result_code == 'APP_LINK_SUCCESS_S0000') {
                  let alert = this.alertCtrl.create({
                    title: CommonTextsKo.MSG_ENTER_AUTH_NUM,
                    inputs: [{type: 'number', name: 'authNum', placeholder: CommonTextsKo.LBL_AUTH_NUM}],
                    buttons: [
                      {
                        text: CommonTextsKo.LBL_OK,
                        handler: data => {
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
                              this.alert(CommonTextsKo.MSG_AUTH_NUM_VERIFY_FAILED);
                            }
                          }, err => {
                            this.alert(CommonTextsKo.MSG_AUTH_NUM_VERIFY_FAILED);
                          });
                        }
                      }
                    },
                    {text: CommonTextsKo.LBL_CANCEL, role: 'cancel'}
                  ],
                    enableBackdropDismiss: false
                  });

                  let loader = this.loadingCtrl.create({
                    spinner: 'dots',
                    content: 'Please wait...',
                    duration: 3000
                  });
                  loader.present();
          
                  setTimeout(() => {
                    loader.dismiss();
                    alert.present();
                  }, 1500);
                }
              }, err => {
                console.error(JSON.stringify(err));
                this.alert(CommonTextsKo.MSG_AUTH_NUM_CREATE_FAILED);
              });
            }
          },
          {text: CommonTextsKo.LBL_CANCEL,
            handler: () => {
            }
          }
        ]
      });
      confrim.present();
    } else {
      this.alert(CommonTextsKo.MSG_ENTER_RECIPIENT);
    }
  }

  orderSend() {
    this.orderSendProvider.orderSend(
      this.btobLoginProvider.getLoginInfo().memberId,
      this.goods.goodsId,
      JSON.parse(JSON.stringify(this.receivers)),
      GlobalConstants.ORDER_SEND_SMS_TYPE_NOTSEND,
      this.myInput['_value']
    ).subscribe((res: any) => {
      this.resResult = new ResResult(res);

      if(res.result_code == 'APP_LINK_SUCCESS_S0000') {
        let modal = this.modalCtrl.create('OrderSendResultModalPage', {item: this.goods, cnt: this.receivers.length});
        modal.present().then(() => {
          this.viewCtrl.dismiss();
        });
        
        this.refreshPointInfo();
      } else {
        this.alert(CommonTextsKo.LBL_ORDER_SEND_FAILED);
      }
    }, err => {
      this.alert(CommonTextsKo.LBL_ORDER_SEND_FAILED);
    });
  }

  goBack() {
    this.navCtrl.pop();
  }

  doRefresh(refresher: Refresher) {
    if(this.btobLoginProvider.isLogin()) {
      this.refreshPointInfo();
      console.log('refresh point..');
      
      setTimeout(() => {
        refresher.complete();
      }, 100);

      let toast = this.toastCtrl.create({
        message: `[보유포인트] ${this.myPoint.toLocaleString()}P`,
        position: 'top',
        duration: 2000,
      });    
      toast.present();
    }
  }

  refreshPointInfo(): number {
    this.btobMemberCreditProvider.getPointInfo(this.btobLoginProvider.getLoginInfo().memberId)
    .subscribe((res: any) => {
      //console.log(res);
      
      if(res.result_code == 'APP_LINK_SUCCESS_S0000') {
        this.btobLoginProvider.setCurrPointInfo(res.result_data.credit_balance - res.result_data.ready_credit);
      }

      this.myPoint = this.btobLoginProvider.getCurrPointInfo();
    });

    return this.myPoint;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderSendModalPage');
  }
}