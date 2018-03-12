import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderReceiverInputModalPage } from './order-receiver-input-modal';

@NgModule({
  declarations: [
    OrderReceiverInputModalPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderReceiverInputModalPage),
  ],
})
export class OrderReceiverInputModalPageModule {}
