import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderSendModalPage } from './order-send-modal';

@NgModule({
  declarations: [
    OrderSendModalPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderSendModalPage),
  ],
})
export class OrderSendModalPageModule {}
