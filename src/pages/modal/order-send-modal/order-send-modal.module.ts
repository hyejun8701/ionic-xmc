import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderSendModalPage } from './order-send-modal';

@NgModule({
  declarations: [
    OrderSendModalPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderSendModalPage),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OrderSendModalPageModule {}
