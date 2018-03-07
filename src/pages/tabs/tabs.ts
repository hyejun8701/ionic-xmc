import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { BtobMember } from '../../models/btob-member';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  btobMember: BtobMember;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private loginService: LoginServiceProvider) {
    this.btobMember = new BtobMember();
  }
  
  /* ionViewCanEnter(): boolean {
    let isLogin = this.loginService.isLogin();
    if(!isLogin) {
      this.btobMember = this.loginService.getLoginInfo();
    }
    return isLogin;
  } */

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }
}