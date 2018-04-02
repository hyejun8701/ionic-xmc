import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BtobMember } from '../../models/btob-member';
import { BtobLoginProvider } from '../../providers/btob/btob-login';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  btobMember: BtobMember;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private btobLoginProvider: BtobLoginProvider) {
    this.btobMember = new BtobMember();
  }
  
  /* ionViewCanEnter(): boolean {
    let isLogin = this.loginProvider.isLogin();
    if(!isLogin) {
      this.btobMember = this.loginProvider.getLoginInfo();
    }
    return isLogin;
  } */

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }
}