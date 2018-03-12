import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FlexLayoutModule } from "@angular/flex-layout";

import { MyApp } from './app.component';
import { MenuPage } from '../pages/menu/menu';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { TopComponent } from '../components/top/top';
import { OrderSendPage } from '../pages/order-send/order-send';
import { ComponentsModule } from '../components/components.module';
import { OrderSendResultPage } from '../pages/order-send-result/order-send-result';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BtobMemberProvider } from '../providers/btob-member/btob-member';
import { LoginProvider } from '../providers/login/login';

@NgModule({
  declarations: [
    MyApp,
    OrderSendPage,
    OrderSendResultPage,
    //OrderReceiverInputModalPage,
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    OrderSendPage,
    OrderSendResultPage,
    //OrderReceiverInputModalPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BtobMemberProvider,
    LoginProvider,
    //{ provide: LocationStrategy, useClass: PathLocationStrategy }
  ]
})
export class AppModule {}
