import { Component } from '@angular/core';
import { Platform, App, AlertController, ToastController } from 'ionic-angular';
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { Keyboard } from "@ionic-native/keyboard";
import { HeaderColor } from '@ionic-native/header-color';
import * as CommonTextsKo from '../common/common-texts-ko';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = 'LoginPage';
  alertShown: boolean = false;

  constructor(private platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, keyboard: Keyboard,
              private app: App, private alertCtrl: AlertController, private toastCtrl: ToastController,
              private headerColor: HeaderColor) {
    platform.ready().then(() => {
      splashScreen.hide();
      keyboard.disableScroll(true);
      headerColor.tint('#ea1a8c');
      statusBar.styleBlackTranslucent();
    });
    
    platform.registerBackButtonAction(() => {
      let activeNav = app.getActiveNavs()[0];
      let rootNav = app.getRootNavs()[0];

      // let toast = this.toastCtrl.create({
      //   message: `${rootNav.getActive().id} |*| ${activeNav.getActive().id}`,
      //   showCloseButton: true,
      //   closeButtonText: 'Ok',
      //   position: 'top'
      // });    
      // toast.present();

      if(activeNav.getViews()[0].name === 'PointHistoryPage' || activeNav.getActive().id === 'PointHistoryPage'
       || activeNav.getViews()[0].name === 'MemberInfoPage' || activeNav.getActive().id === 'MemberInfoPage') {
        this.app.getActiveNav().setRoot('GoodsListPage');
      } else if(activeNav.getActive().id === 'GoodsListPage' || activeNav.getActive().id === 'LoginPage') {
        if(this.alertShown == false) {
          this.presentConfirm();
        }
      } else {
        // modal pop
        activeNav.pop();
      }
    });
  }

  presentConfirm() {
    let confrim = this.alertCtrl.create({
      title : CommonTextsKo.MSG_WANT_TO_EXIT_APP,
      message: '',
      buttons: [
        {
          text: CommonTextsKo.LBL_OK,
          handler: () => {
            this.platform.exitApp();
          }
        },
        {
          text: CommonTextsKo.LBL_CANCEL,
          role: 'cancel',
          handler: () => {
            this.alertShown = false;
          }
        }
      ]
    });

    confrim.present().then(() => {
      this.alertShown = true;
    });
  }
}