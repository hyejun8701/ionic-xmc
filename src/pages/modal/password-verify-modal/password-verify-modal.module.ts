import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PasswordVerifyModalPage } from './password-verify-modal';

@NgModule({
  declarations: [
    PasswordVerifyModalPage,
  ],
  imports: [
    IonicPageModule.forChild(PasswordVerifyModalPage),
  ],
})
export class PasswordVerifyModalPageModule {}
