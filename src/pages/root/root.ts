import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BtobMember } from '../../models/btob-member';
import { LoginProvider } from '../../providers/login/login';

@IonicPage()
@Component({
  selector: 'page-root',
  templateUrl: 'root.html',
})
export class RootPage {
  btobMember: BtobMember;
  rootPage = 'GoodsListPage';

  constructor(public navCtrl: NavController, public navParams: NavParams, private loginProvider: LoginProvider) {
    
  }

  ionViewCanEnter(): boolean {
    let isLogin = this.loginProvider.isLogin();
    if(isLogin) {
      this.btobMember = this.loginProvider.getLoginInfo();
      //console.log(this.btobMember);
    }
    return this.loginProvider.isLogin();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RootPage');
  }

  ionViewDidEnter() {
    console.log("ionViewDidEnter RootPage");
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave RootPage');
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave RootPage');
  }

  ionViewWillUnload() {
    console.log('ionViewWillUnload RootPage');
  }
}