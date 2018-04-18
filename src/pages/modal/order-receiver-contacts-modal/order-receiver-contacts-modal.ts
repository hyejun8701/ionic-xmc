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
      
      //this.items = this.phoneAddress;

      this.phoneAddress.sort((item1, item2) => {
        return item1.displayName < item2.displayName ? -1 : item1.displayName > item2.displayName ? 1 : 0
      });

      //if(setType == 'init') {
        this.items = this.phoneAddress;
      //}
    },
    err => {
      alert(err);
    });    
  }
  
  filterItems(ev: any) {
    this.setItems();

    let val = ev.target.value;

    if (val && val.trim() !== '') {
      if(Hangul.isConsonant(val.toLowerCase())) {        
        this.items = this.items.filter(item => {
          let schText = Hangul.disassemble(val.toLowerCase());
          for (let i = 0; i < schText.length; i++) {
            if(!Hangul.disassemble(item.displayName.toLowerCase()).includes(schText[i])) {
              return false;
            }
          }

          return true;
        });
      } else {
        this.items = this.items.filter(item => {
          return Hangul.search(item.displayName.toLowerCase(), val.toLowerCase()) > -1;
        });
      }
    }
    // else {
    //    this.setItems();
    // }
  }

  dismiss() {
    this.viewCtrl.dismiss(this.datas);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderReceiverContactsModalPage');
  }
}