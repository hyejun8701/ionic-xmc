import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { BtobMember } from '../../models/btob-member';
import { BtobLoginProvider } from '../../providers/btob/btob-login';
import * as CommonTextsKo from '../../common/common-texts-ko';

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
  rootPage: string;

  pages: PageInterface[] = [
    {title: CommonTextsKo.LBL_GOODS_LIST, component: 'GoodsListPage', icon:'home'},
    {title: CommonTextsKo.LBL_POINT_MANAGE, component: 'PointHistoryPage', icon:'card'}
  ]

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private btobLoginProvider: BtobLoginProvider,
              private menuCtrl: MenuController
            ) {
              const changePage = this.navParams.get('rootPage');
              if(changePage == null) {
                this.openPage(this.pages[0]);
              }
  }

  ionViewCanEnter(): boolean {
    let isLogin = this.btobLoginProvider.isLogin();
    if(isLogin) {
      this.btobMember = this.btobLoginProvider.getLoginInfo();
    }
    return this.btobLoginProvider.isLogin();
  }

  openPage(page: PageInterface) {
    console.log(">>>>>>>>>>> " + page.component);
    this.navCtrl.popToRoot();
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
    const changePage = this.navParams.get('rootPage');
    if(changePage != null) {
      this.openPage(this.pages[1]);
      this.menuCtrl.enable(true);
    }
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