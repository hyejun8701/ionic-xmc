import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BtobMember } from '../../models/btob-member';
import { BtobLoginProvider } from '../../providers/btob/btob-login';
import { App, MenuController } from 'ionic-angular';

export interface PageInterface {
  title: string;
  component? :any;
  icon: string;
}

@IonicPage()
@Component({
  selector: 'page-root',
  templateUrl: 'root.html',
})
export class RootPage {
  btobMember: BtobMember;
  rootPage = 'GoodsListPage';

  pages: PageInterface[] = [
    {title: '상품리스트', component: 'GoodsListPage', icon:'home'},
    {title: '포인트관리', component: 'PointHistoryPage', icon:'card'}
  ]

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private btobLoginProvider: BtobLoginProvider,
              private app: App,
              private menu: MenuController
            ) {
                menu.enable(true);
  }

  ionViewCanEnter(): boolean {
    let isLogin = this.btobLoginProvider.isLogin();
    if(isLogin) {
      this.btobMember = this.btobLoginProvider.getLoginInfo();
    }
    return this.btobLoginProvider.isLogin();
  }

  openPage(page: PageInterface) {
    console.log(page);
    this.rootPage = page.component;
  }

  logOut() {
    this.btobLoginProvider.logOut();
    this.navCtrl.setRoot('LoginPage');
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