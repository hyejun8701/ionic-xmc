import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderSendResultModalPage } from './order-send-result-modal';

@NgModule({
  declarations: [
    OrderSendResultModalPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderSendResultModalPage),
  ],
})
export class OrderSendResultModalPageModule {}
