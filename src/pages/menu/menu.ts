import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, MenuController, App } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
import { GoodsListPage } from '../goods-list/goods-list';
import { PointHistoryPage } from '../point-history/point-history';

export interface PageInterface {
  title: string;
  component? :any;
  icon: string;
}

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  rootPage = 'RootPage';

  @ViewChild(Nav) nav: Nav;

  pages: PageInterface[] = [
    {title: '상품리스트', component: GoodsListPage, icon:'home'},
    {title: '포인트관리', component: PointHistoryPage, icon:'star'}
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, public app: App,
  private loginProvider: LoginProvider) {
  }

  /* ionViewCanEnter(): boolean {
    let isLogin = this.loginService.isLogin();
    if(!isLogin) {
      this.navCtrl.setRoot('LoginPage');
    }
    return isLogin;
  } */

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  logOut() {
    this.loginProvider.logOut();
    this.navCtrl.setRoot('LoginPage');
  }

  // openPage(page: PageInterface) {
  //   console.log(page);
  //   //this.navCtrl.push(page.component);
  //   //this.rootPage = page.component;
  //   console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
  //   console.log(this.app.getRootNav());
  // }
}