import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, MenuController, App } from 'ionic-angular';
import { LoginServiceProvider } from '../../providers/login-service/login-service';

export interface PageInterface {
  title: string;
  pageName: string;
  tabComponent? :any;
  index?: number;
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
    {title: '상품리스트', pageName: 'RootPage', tabComponent: 'GoodsListPage', index: 0, icon:'home'},
    {title: '포인트관리', pageName: 'RootPage', tabComponent: 'PointHistoryPage', index: 1, icon:'star'},
    {title: '개인정보', pageName: 'MemberCheckPage', icon:'settings'}
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, public app: App,
  private loginService: LoginServiceProvider) {
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
    this.loginService.logOut();
    this.navCtrl.setRoot('LoginPage');
  }

  openPage(page: PageInterface) {
    console.log(page);
    this.navCtrl.push(page.pageName);
  }
}