import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { Contacts } from '@ionic-native/contacts';
import * as Hangul from 'hangul-js';
import * as GlobalConstants from '../../../common/global-constants';
import * as CommonFuntions from '../../../common/common-funtions';
import * as CommonTextsKo from '../../../common/common-texts-ko';

export interface ContactsInterface {
  id: string;
  displayName: string;
  phoneNumber: string;
  checked?: boolean;
}

@IonicPage()
@Component({
  selector: 'page-order-receiver-contacts-modal',
  templateUrl: 'order-receiver-contacts-modal.html',
})
export class OrderReceiverContactsModalPage {
  contacts: ContactsInterface[];
  items: ContactsInterface[];
  datas: ContactsInterface[];
  possibleCnt: number;
  alreadyUse: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
              private deviceContacts: Contacts, private alertCtrl: AlertController
            ) {
    this.alreadyUse = navParams.get('receivers');
    this.possibleCnt = GlobalConstants.RECEIVER_POSSIBLE_COUNT_DEFAULT - this.alreadyUse.length;
    this.setItems('init');
    this.datas = new Array();
  }

  setItems(setType?: string) {
    this.deviceContacts.find(['*'], {multiple: true})
    .then((res) => {
      this.contacts = new Array();
      for(let i = 0; i < res.length; i++) {
        if(res[i].displayName == null || res[i].phoneNumbers == null) {
          continue;
        }

        let value = res[i].phoneNumbers[0].value;
        value = CommonFuntions.fnChangeToCallNumberFormat(value);

        let checked = false;
        for (let j = 0; j < this.datas.length; j++) {
          if(res[i].id === this.datas[j].id) {
            checked = true;
          }
        }

        this.contacts.push({
          id: res[i].id,
          displayName: res[i].displayName,
          phoneNumber: value,
          checked: checked
        });
      }
      
      this.contacts.sort((item1, item2) => {
        return item1.displayName < item2.displayName ? -1 : item1.displayName > item2.displayName ? 1 : 0;
      });

      if(setType == 'init') {
        this.items = this.contacts;
      }
    },
    err => {
      alert(err);
    });    
  }
  
  filterItems(ev: any) {
    this.setItems();
    this.items = this.contacts;

    let val = ev.target.value;
    
    if (val && val.trim() !== '') {
      if(Hangul.isConsonant(val.toLowerCase())) {
        this.items = this.items.filter(item => {
          let origin = item.displayName.toLowerCase();
          let preTarget = new Array();
          let target = new Array();

          for(let i = 0; i < origin.length; i++) {
            let temp = Hangul.disassemble(origin[i]);
            if(Hangul.endsWithConsonant(origin[i])) {// 1. 종성이 포함되어있는지 판단해서 제외처리
              for (let j = 0; j < temp.length; j++) {
                if(j != 2) {
                  preTarget.push(temp[j]);
                }
              }
            } else {
              preTarget.push(...temp);
            }
          }

          for (let k = 0; k < preTarget.length; k++) {
            if(!Hangul.isVowel(preTarget[k])) {// 2. 모음인지 판단해서 제외처리
              target.push(preTarget[k]);
            }
          }

          let schText = Hangul.disassemble(val.toLowerCase());
          let matchCnt = 0;

          for (let i = 0; i < schText.length; i++) {
            if(!(target.indexOf(schText[i]) > -1)) {// 3. 해당 자음 포함하지 않으면 실패
              return false;
            } else {
              let arr = Hangul.rangeSearch(target.join(""), schText.join(""));// 4. 범위를 비교해서 일치하지 않으면 실패

              if(arr == null || arr == "") {
                return false;
              } else {
                matchCnt++;
              }
            }
          }

          if(schText.length != matchCnt) {
            return false;
          }

          return true;
        });
      } else {
        this.items = this.items.filter(item => {
          return Hangul.search(item.displayName.toLowerCase(), val.toLowerCase()) > -1;
        });
      }
    }
  }

  setDatas(ev: any, item: ContactsInterface) {
    //console.log(`${ev.checked}, ${JSON.stringify(item)}`);
    item.checked = ev.checked;

    if(ev.checked) {
      if(this.possibleCnt === 0) {
        let alert = this.alertCtrl.create({
          subTitle: CommonTextsKo.MSG_MAXIMUM_NUMBER_OF_RECIPIENTS_WRONG,
          buttons: [
            {
              text: CommonTextsKo.LBL_OK,
              handler: () => {
                ev.checked = false;
              }
            }
          ]
        });
        alert.present();
      } else {
        if(this.alreadyUse.indexOf(item.phoneNumber.replace(/\-/g, '')) > -1) {
          let alert = this.alertCtrl.create({
            subTitle: CommonTextsKo.MSG_NUMBER_ALREADY_INCLUDED_IN_THE_RECIPIENT,
            buttons: [
              {
                text: CommonTextsKo.LBL_ADD,
                handler: () => {
                  this.pushDatas(item);
                }
              },
              {
                text: CommonTextsKo.LBL_CANCEL,
                handler: () => {
                  ev.checked = false;
                }
              }
            ]
          });
          alert.present();
        } else {
          this.pushDatas(item);
        }
      }
    } else {
      this.removeDatas(item);
    }
  }

  pushDatas(item: ContactsInterface) {
    this.datas.push(item);
    this.possibleCnt--;
  }

  removeDatas(item: ContactsInterface) {
    this.datas = this.datas.filter(data => data.id !== item.id);
    this.possibleCnt = (GlobalConstants.RECEIVER_POSSIBLE_COUNT_DEFAULT - this.alreadyUse.length) - this.datas.length;
    this.changeChecked(item);
  }

  changeChecked(item: ContactsInterface) {
    this.items.forEach(element => {
      if((element.id === item.id) && element.checked == true) {
        element.checked = false;
        //console.log("element => " + JSON.stringify(element));
      }
    });
  }

  dismiss() {
    this.viewCtrl.dismiss(this.datas);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderReceiverContactsModalPage');
  }
}