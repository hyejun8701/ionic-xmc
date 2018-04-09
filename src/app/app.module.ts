import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FlexLayoutModule } from "@angular/flex-layout";

import { MyApp } from './app.component';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { OrderSendResultPage } from '../pages/order-send-result/order-send-result';
import { HttpClientModule } from '@angular/common/http';
import { BtobMemberProvider } from '../providers/btob/btob-member';
import { BtobLoginProvider } from '../providers/btob/btob-login';
import { BtobEventGoodsProvider } from '../providers/btob/btob-event-goods';
import { OrderSendProvider } from '../providers/order/order-send';
import { BtobMemberCreditUseHistoryProvider } from '../providers/btob/btob-member-credit-use-history';
import { BtobMemberCreditProvider } from '../providers/btob/btob-member-credit';

@NgModule({
  declarations: [
    MyApp,
    //OrderSendResultPage,
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
    //OrderSendResultPage,
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
    BtobMemberCreditUseHistoryProvider,
    BtobMemberCreditProvider,
    //{ provide: LocationStrategy, useClass: PathLocationStrategy }
  ]
})
export class AppModule {}
