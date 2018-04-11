import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderReceiverContactsModalPage } from './order-receiver-contacts-modal';

@NgModule({
  declarations: [
    OrderReceiverContactsModalPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderReceiverContactsModalPage),
  ],
})
export class OrderReceiverContactsModalPageModule {}
