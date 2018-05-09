import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Keyboard } from "@ionic-native/keyboard";
import { FlexLayoutModule } from "@angular/flex-layout";

import { MyApp } from './app.component';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BtobMemberProvider } from '../providers/btob/btob-member';
import { BtobLoginProvider } from '../providers/btob/btob-login';
import { BtobEventGoodsProvider } from '../providers/btob/btob-event-goods';
import { OrderSendProvider } from '../providers/order/order-send';
import { BtobMemberCreditUseHistoryProvider } from '../providers/btob/btob-member-credit-use-history';
import { BtobMemberCreditProvider } from '../providers/btob/btob-member-credit';

import { CallNumber } from '@ionic-native/call-number';
import { Contacts } from '@ionic-native/contacts';
import { OrderSendAuthProvider } from '../providers/order-send-auth/order-send-auth';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    IonicModule.forRoot(MyApp, {scrollAssist: false, autoFocusAssist: false}),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BtobMemberProvider,
    BtobLoginProvider,
    BtobEventGoodsProvider,
    OrderSendProvider,
    BtobMemberCreditUseHistoryProvider,
    BtobMemberCreditProvider,
    CallNumber,
    Contacts,
    OrderSendAuthProvider
    //{ provide: LocationStrategy, useClass: PathLocationStrategy }
  ]
})
export class AppModule {}