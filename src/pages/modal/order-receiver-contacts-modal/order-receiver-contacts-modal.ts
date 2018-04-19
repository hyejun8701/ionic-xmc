import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Contacts, Contact } from '@ionic-native/contacts';
import * as Hangul from 'hangul-js';

export interface PhoneAddressInterface {
  displayName: string;
  phoneNumber: string;
}

@IonicPage()
@Component({
  selector: 'page-order-receiver-contacts-modal',
  templateUrl: 'order-receiver-contacts-modal.html',
})
export class OrderReceiverContactsModalPage {
  phoneAddress: PhoneAddressInterface[];
  items: PhoneAddressInterface[];
  datas: Array<string>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              private contacts: Contacts
            ) {
    this.setItems('init');
  }

  setItems(setType?: string) {
    this.contacts.find(['*'], {multiple: true})
    .then((res) => {
      this.phoneAddress = new Array();
      for(let i = 0; i < res.length; i++) {
        if(res[i].displayName == null || res[i].phoneNumbers == null) {
          continue;
        }

        let value = res[i].phoneNumbers[0].value;
        value = value.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, "$1-$2-$3");

        this.phoneAddress.push({
          displayName: res[i].displayName,
          phoneNumber: value
        });
      }
      
      this.phoneAddress.sort((item1, item2) => {
        return item1.displayName < item2.displayName ? -1 : item1.displayName > item2.displayName ? 1 : 0
      });

      if(setType == 'init') {
        this.items = this.phoneAddress;
      }
    },
    err => {
      alert(err);
    });    
  }
  
  filterItems(ev: any) {
    this.setItems();
    this.items = this.phoneAddress;

    let val = ev.target.value;
    
    if (val && val.trim() !== '') {
      if(Hangul.isConsonant(val.toLowerCase())) {
        this.items = this.items.filter(item => {
          let origin = item.displayName.toLowerCase();
          let preTarget = new Array();
          let target = new Array();

          for(let i = 0; i < origin.length; i++) {
            //console.log(origin[i]);
            
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

          //console.log('=============> ' + preTarget);

          for (let k = 0; k < preTarget.length; k++) {
            if(!Hangul.isVowel(preTarget[k])) {// 2. 모음인지 판단해서 제외처리
              target.push(preTarget[k]);
            }
          }

          //console.log('=============> ' + target);

          let schText = Hangul.disassemble(val.toLowerCase());
          let matchCnt = 0;

          for (let i = 0; i < schText.length; i++) {
            if(!(target.indexOf(schText[i]) > -1)) {// 3. 해당 자음 포함하지 않으면 실패
              return false;
            } else {
              let arr = Hangul.rangeSearch(target.join(""), schText.join(""));// 4. 범위를 비교해서 일치하지 않으면 실패
              //console.log('=============> ' + arr);

              if(arr == null || arr == "") {
                return false;
              } else {
                matchCnt++;
              }
            }
          }

          //console.log('=============> ' + matchCnt);

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

  dismiss() {
    this.viewCtrl.dismiss(this.datas);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderReceiverContactsModalPage');
  }
}