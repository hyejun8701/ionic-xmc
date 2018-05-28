import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RootIndexModalPage } from './root-index-modal';

@NgModule({
  declarations: [
    RootIndexModalPage,
  ],
  imports: [
    IonicPageModule.forChild(RootIndexModalPage),
  ],
})
export class RootIndexModalPageModule {}
