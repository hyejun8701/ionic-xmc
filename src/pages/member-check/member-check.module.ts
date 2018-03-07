import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemberCheckPage } from './member-check';

@NgModule({
  declarations: [
    MemberCheckPage,
  ],
  imports: [
    IonicPageModule.forChild(MemberCheckPage),
  ],
})
export class MemberCheckPageModule {}
