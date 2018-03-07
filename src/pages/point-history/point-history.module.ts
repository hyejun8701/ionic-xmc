import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PointHistoryPage } from './point-history';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    PointHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(PointHistoryPage),
    PipesModule
  ],
})
export class PointHistoryPageModule {}
