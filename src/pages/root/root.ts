import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, App, ToastController, ViewController, NavOptions, Nav } from 'ionic-angular';
import { BtobMember } from '../../models/btob-member';
import { BtobLoginProvider } from '../../providers/btob/btob-login';
import * as CommonTextsKo from '../../common/common-texts-ko';
import { BaseProvider } from '../../providers/base-provider';

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
              private menuCtrl: MenuController,
              private app: App,
              private viewCtrl: ViewController,
              private toastCtrl: ToastController
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
    //this.navCtrl.popToRoot();
    this.rootPage = page.component;

    let activeNav = this.app.getActiveNav();
    let rootNav = this.app.getRootNav();

    // let toast = this.toastCtrl.create({
    //   message: `${rootNav.getActive().id} |*| ${activeNav.getActive().id}`,
    //   showCloseButton: true,
    //   closeButtonText: 'Ok',
    //   position: 'bottom'
    // });    
    // toast.present();

    if(activeNav.getActive().id != 'LoginPage' && page.component !== activeNav.getActive().id) {
      this.app.getActiveNav().setRoot(page.component);
    }
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