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
import { BtobMemberProvider } from '../providers/btob/btob-member/btob-member';
import { BtobLoginProvider } from '../providers/btob/btob-login/btob-login';
import { BtobEventGoodsProvider } from '../providers/btob/btob-event-goods/btob-event-goods';
import { OrderSendProvider } from '../providers/order/order-send/order-send';

@NgModule({
  declarations: [
    MyApp,
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
    OrderSendResultPage,
    //OrderReceiverInputModalPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BtobMemberProvider,
    BtobLoginProvider,
    BtobEventGoodsProvider,
    OrderSendProvider,
    //{ provide: LocationStrategy, useClass: PathLocationStrategy }
  ]
})
export class AppModule {}
