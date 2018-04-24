import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import * as GlobalConstants from '../../../common/global-constants';
import * as CommonFuntions from '../../../common/common-funtions';

@IonicPage()
@Component({
  selector: 'page-order-receiver-input-modal',
  templateUrl: 'order-receiver-input-modal.html',
})
export class OrderReceiverInputModalPage {
  possibleCnt: number;
  alreadyUse: any;
  datas: Array<string>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              private alertCtrl: AlertController) {
    this.alreadyUse = navParams.get('receivers');
    this.datas = ["", "", ""];
    this.possibleCnt = GlobalConstants.RECEIVER_POSSIBLE_COUNT_DEFAULT - this.alreadyUse.length;
  }

  receiversMaxOverAlert() {
    let alert = this.alertCtrl.create({
      subTitle: '수신자는 최대 10명 입니다.',
      buttons: [{text: '확인'}]
    });
    alert.present();
  }

  inputAdd() {
    if(this.possibleCnt < 1) {
      this.receiversMaxOverAlert();
    } else {
      this.datas.push("");
      this.possibleCnt--;
    }
  }
  
  inputFocusout(event: any, data) {
    let value = event.target.value;

    console.log("================> " + this.possibleCnt);

    let remainCnt = 0;
    
    this.datas.forEach((data) => {
      if(data === "") {
        remainCnt++;
      }
    });

    console.log("remainCnt => " + remainCnt);

    if((this.possibleCnt + remainCnt) < 1) {
      this.receiversMaxOverAlert();
      event.target.value = "";
    } else if (value && value.trim() !== '') {
      value = CommonFuntions.fnChangeToCallNumberFormat(value);
      
      let alreadyCnt = 0;
      // this.datas.forEach((element, idx) => {
      //   if(element[idx] === value) {
      //     alreadyCnt++;
      //   }
      // });

      //1. already cnt check alert
      //2. already + datas length, add/remove input  check

      if((this.alreadyUse.indexOf(value) > -1) || (alreadyCnt > 1)) {
        let alert = this.alertCtrl.create({
          subTitle: '이미 수신자에 포함된 번호입니다.<br/>그래도 추가하시겠습니까?',
          buttons: [
            {
              text: '추가',
              handler: () => {
                event.target.value = value;
              }
            },
            {
              text: '취소',
              handler: () => {
                event.target.value = "";
              }
            }
          ]
        });
        alert.present();
      } else {
        event.target.value = value;
      }
    }
  }

  trackByFn(i) {
    return i;
  }

  inputRemove(i) {
    this.datas.splice(i , 1);
    
    console.log("this.datas.length => " + this.datas.length);

    this.possibleCnt = (GlobalConstants.RECEIVER_POSSIBLE_COUNT_DEFAULT - this.alreadyUse.length) - this.datas.length;

    console.log("this.possibleCnt => " + this.possibleCnt);
  }

  dismiss() {
    this.datas.forEach((element, idx, array) => {
      array[idx] = CommonFuntions.fnChangeToCallNumberFormat(element);
    });

    this.viewCtrl.dismiss(this.datas);
  }

  closeModal() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderReceiverInputModalPage');
  }
}