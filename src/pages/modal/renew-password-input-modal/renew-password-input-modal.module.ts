import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RenewPasswordInputModalPage } from './renew-password-input-modal';

@NgModule({
  declarations: [
    RenewPasswordInputModalPage,
  ],
  imports: [
    IonicPageModule.forChild(RenewPasswordInputModalPage),
  ],
})
export class RenewPasswordInputModalPageModule {}
