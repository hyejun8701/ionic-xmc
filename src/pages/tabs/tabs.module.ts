import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsPage } from './tabs';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    TabsPage,
  ],
  imports: [
    IonicPageModule.forChild(TabsPage),
    FlexLayoutModule
  ],
})
export class TabsPageModule {}