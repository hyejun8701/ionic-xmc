import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, App, ToastController, ViewController, NavOptions, Nav } from 'ionic-angular';
import { BtobMember } from '../../models/btob-member';
import { BtobLoginProvider } from '../../providers/btob/btob-login';
import * as CommonTextsKo from '../../common/common-texts-ko';
import { BaseProvider } from '../../providers/base-provider';
import { BtobMemberCreditProvider } from '../../providers/btob/btob-member-credit';

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
              private toastCtrl: ToastController,
              private btobMemberCreditProvider: BtobMemberCreditProvider,
              private baseProvider: BaseProvider
            ) {
              const changePage = this.navParams.get('rootPage');

              if(changePage == null) {
                this.baseProvider.setRootPage(this.pages[0].component);
                this.openPage(this.pages[0]);
              }

             
  }

  menuOpened() {
    this.btobMemberCreditProvider.getPointInfo(this.btobLoginProvider.getLoginInfo().memberId)
    .subscribe((res: any) => {
      //console.log(res);
      
      if(res.result_code == 'APP_LINK_SUCCESS_S0000') {
        this.btobLoginProvider.setCurrPointInfo(res.result_data.credit_balance - res.result_data.ready_credit);
      }
    });
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

    let activeNav = this.app.getActiveNav();
    let rootNav = this.app.getRootNav();
    
    if(activeNav.getActive().id != 'LoginPage' && page.component !== activeNav.getActive().id) {
      this.app.getActiveNav().setRoot(page.component);
    }
  }

  logOut() {
    this.btobLoginProvider.logOut();
    this.navCtrl.setRoot('LoginPage');
  }

  ngOnInit() {
    this.baseProvider.rootPage.subscribe(data => this.rootPage = data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RootPage');
  }

  ionViewDidEnter() {
    console.log("ionViewDidEnter RootPage");
    // const changePage = this.navParams.get('rootPage');

    // if(changePage != null) {
    //   this.openPage(this.pages[1]);
    //   this.menuCtrl.enable(true);
    // }
    this.menuCtrl.enable(true);
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