import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-order-receiver-input-modal',
  templateUrl: 'order-receiver-input-modal.html',
})
export class OrderReceiverInputModalPage {
  datas: Array<string>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.datas = ["", "", ""];
  }

  inputAdd() {
    this.datas.push("");
  }

  onChange(index: number, receiver) {
    console.log(index);
    console.log(receiver);
    this.datas[index] = receiver;
  }

  trackByFn(i) {
    return i;
  }

  inputRemove(i) {
    this.datas.splice(i , 1);
  }

  dismiss() {
    this.viewCtrl.dismiss(this.datas);
  }

  closeModal() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderReceiverInputModalPage');
  }
}