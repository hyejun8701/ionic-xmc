import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderSendPage } from './order-send';

@NgModule({
  declarations: [
    OrderSendPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderSendPage),
  ],
})
export class OrderSendPageModule {}