import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, NavController} from 'ionic-angular';
import { Deeplinks } from '@ionic-native/deeplinks';
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { LoginProvider } from '../providers/login/login';

export interface PageInterface {
  title: string;
  component? :any;
  icon: string;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = 'LoginPage';

  pages: PageInterface[] = [
    {title: '상품리스트', component: 'GoodsListPage', icon:'home'},
    {title: '포인트관리', component: 'PointHistoryPage', icon:'star'}
  ]

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private loginProvider: LoginProvider) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page: PageInterface) {
    console.log(page);
    this.nav.push(page.component);
  }

  logOut() {
    this.loginProvider.logOut();
    this.nav.setRoot('LoginPage');
  }
}