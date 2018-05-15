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
export class OrderReceiverInputModalPage extends BasePage {
  possibleCnt: number;
  alreadyUse: any;
  datas: Array<string>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private alertCtrl: AlertController) {
    super(alertCtrl);

    this.alreadyUse = navParams.get('receivers');

    // this.alreadyUse.forEach((element, idx, array) => {
    //   array[idx] = element.replace(/\-/g, '');
    // });

    this.datas = ["", "", ""];
    this.possibleCnt = GlobalConstants.RECEIVER_POSSIBLE_COUNT_DEFAULT - this.alreadyUse.length;
  }

  inputAdd() {
    let remainCnt = 1;
    this.datas.forEach((data) => {
      if(data === "") {
        remainCnt++;
      }
    });

    if(this.possibleCnt < 1 || this.possibleCnt < remainCnt) {
      this.alert(CommonTextsKo.MSG_MAXIMUM_NUMBER_OF_RECIPIENTS_WRONG);
    } else {
      this.datas.push("");
    }
  }

  // inputFocus(event: any, idx) {
  //   console.log(`this.datas[${idx}] ================> ${this.datas[idx]}`);
  //   if(this.datas[idx] != null && this.datas[idx] != "") {

  //   }
  // }
  
  inputFocusout(event: any, idx) {
    let value = event.target.value;
    console.log("possibleCnt ================> " + this.possibleCnt);
    
    if (value && value.trim() !== '') {
      if(this.possibleCnt < 0) {
        event.target.value = "";
        this.datas[idx] = "";

        this.alert(CommonTextsKo.MSG_MAXIMUM_NUMBER_OF_RECIPIENTS_WRONG);
      } else {
        //value = CommonFuntions.fnChangeToCallNumberFormat(value);
        
        let alreadyCnt = 0;
        this.datas.forEach((data, index, array) => {
          if(array[index] === value) {
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
                }
              },
              {
                text: CommonTextsKo.LBL_CANCEL,
                handler: () => {
                  event.target.value = "";
                  this.datas[idx] = "";
                }
              }
            ]
          });
          alert.present();
        } else {
          event.target.value = value;
        }
      }

      this.setPossibleCnt();
    }
  }

  trackByFn(i) {
    return i;
  }

  inputRemove(i) {
    this.datas.splice(i , 1);
    
    console.log("this.possibleCnt => " + this.possibleCnt);
    this.setPossibleCnt();
  }

  setPossibleCnt() {
    this.possibleCnt = (GlobalConstants.RECEIVER_POSSIBLE_COUNT_DEFAULT - this.alreadyUse.length) - this.getInputUseCnt();
    console.log("after => " + this.possibleCnt);
  }

  getInputUseCnt(): number {
    let useCnt = 0;
    
    this.datas.forEach((data) => {
      if(data != "") {
        useCnt++;
      }
    });
    return useCnt;
  }

  dismiss() {
    // this.datas.forEach((element, idx, array) => {
    //   array[idx] = CommonFuntions.fnChangeToCallNumberFormat(element);
    // });

    this.viewCtrl.dismiss(this.datas.slice(0, this.getInputUseCnt()));
  }

  closeModal() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad OrderReceiverInputModalPage');
  }
}