import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import * as GlobalConstants from '../../../common/global-constants';
import * as CommonFuntions from '../../../common/common-funtions';
import * as CommonTextsKo from '../../../common/common-texts-ko';
import { BasePage } from '../../base-page';

@IonicPage()
@Component({
  selector: 'page-order-receiver-input-modal',
  templateUrl: 'order-receiver-input-modal.html',
})
export class OrderReceiverInputModalPage extends BasePage{
  possibleCnt: number;
  alreadyUse: any;
  datas: Array<string>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private alertCtrl: AlertController) {
    super(alertCtrl);
    this.alreadyUse = navParams.get('receivers');
    this.datas = ["", "", ""];
    this.possibleCnt = GlobalConstants.RECEIVER_POSSIBLE_COUNT_DEFAULT - this.alreadyUse.length;
    // 1. 발송가능수량은 기본수량 10 에서 입력창 이전화면에서 넘어온 수량을 뺀 나머지

    console.log("모달표시 시점 발송가능수량 => " + this.possibleCnt);

  }

  inputAdd() {
    if(this.possibleCnt < 1) {// 이미 max 인데 인풋창추가버튼을 누를때
      this.alert(CommonTextsKo.MSG_MAXIMUM_NUMBER_OF_RECIPIENTS_WRONG);
    } else {
      let remainCnt = 1;

      this.datas.forEach((data) => {
        if(data === "") {
          remainCnt++;
        }
      });
  
      console.log("remainCnt => " + remainCnt);

      this.datas.push("");
      //this.possibleCnt--;
    }
  }
  
  inputFocusout(event: any, data) {
    let value = event.target.value;

    console.log("value ================> " + value);
    console.log("possibleCnt ================> " + this.possibleCnt);

    let remainCnt = 0;
    
    this.datas.forEach((data) => {
      if(data === "") {
        remainCnt++;
      }
    });

    // console.log("remainCnt => " + remainCnt);

    // if((this.possibleCnt + remainCnt) < 1) {
    //   this.receiversMaxOverAlert();
    //   event.target.value = "";
    // } else 
    
    if (value && value.trim() !== '') {
      value = CommonFuntions.fnChangeToCallNumberFormat(value);
      
      let alreadyCnt = 0;
      this.datas.forEach((element, idx) => {
        console.log(JSON.stringify(this.datas));
        console.log(element);
        console.log(idx);
        if(element === value) {
          alreadyCnt++;
        }
      });

      console.log("alreadyCnt => " + alreadyCnt);

      //1. already cnt check alert
      //2. already + datas length, add/remove input  check

      if((this.alreadyUse.indexOf(value) > -1) || (alreadyCnt > 1)) {
        let alert = this.alertCtrl.create({
          subTitle: CommonTextsKo.MSG_NUMBER_ALREADY_INCLUDED_IN_THE_RECIPIENT,
          buttons: [
            {
              text: CommonTextsKo.LBL_ADD,
              handler: () => {
                event.target.value = value;
                this.possibleCnt--;
              }
            },
            {
              text: CommonTextsKo.LBL_CANCEL,
              handler: () => {
                event.target.value = "";
              }
            }
          ]
        });
        alert.present();
      } else {
        event.target.value = value;
        this.possibleCnt--;
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