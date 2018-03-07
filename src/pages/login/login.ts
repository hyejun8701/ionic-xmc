import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { BtobMember } from '../../models/btob-member';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  memberId: string;
  password: string;
  btobMember: BtobMember;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private loginService: LoginServiceProvider
            ) {
              console.log('a');
              this.loginService.logOut();
  }

  doLogin() {
    let result = this.loginService.authenticate(this.memberId, this.password);

    console.log(result);

    let isL = this.loginService.isLogin();
    console.log(isL);
    if(isL) {
      this.navCtrl.setRoot('RootPage');
    }
  }

  ionViewDidEnter() {
    console.log("ionViewDidEnter LoginPage");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave LoginPage');
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave LoginPage');
  }

  ionViewWillUnload() {
    console.log('ionViewWillUnload LoginPage');
  }
}