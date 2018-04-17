import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.phoneAddress = navParams.get('phoneAddress');
    this.setItems();
  }

  setItems() {
    this.items = this.phoneAddress;
  }

  filterItems(ev: any) {
    this.setItems();
    let val = ev.target.value;

    if (val && val.trim() !== '') {
      this.items = this.items.filter(item => {
        return item.displayName.toLowerCase().includes(val.toLowerCase());
      });
    }
  }

  itemCheck($event) {
    
  }

  dismiss() {
    this.viewCtrl.dismiss(this.datas);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderReceiverContactsModalPage');
  }

}
