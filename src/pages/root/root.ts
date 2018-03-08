import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { BtobMember } from '../../models/btob-member';

@IonicPage()
@Component({
  selector: 'page-root',
  templateUrl: 'root.html',
})
export class RootPage {
  btobMember: BtobMember;
  rootPage = 'GoodsListPage';

  constructor(public navCtrl: NavController, public navParams: NavParams, private loginService: LoginServiceProvider) {
    
  }

  ionViewCanEnter(): boolean {
    let isLogin = this.loginService.isLogin();
    if(isLogin) {
      this.btobMember = this.loginService.getLoginInfo();
      //console.log(this.btobMember);
    }
    return this.loginService.isLogin();
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