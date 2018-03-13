import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SegmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-segment',
  templateUrl: 'segment.html',
})
export class SegmentPage {
  relationship: string = 'friends';
  modelStyle: string = 'B';
  appType: string = 'free';
  icons: string = 'camera';
  isDisabledB: boolean = true;
  isDisabledS: boolean = false;

  valve = {
    daysInfo: [],
    selectDay: '0',
    periodDays: 3
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.periodDaysChange(this.valve);
  }

  periodDaysChange(valve) {
    valve.periodDays = parseInt(valve.periodDays);
    if (valve.daysInfo.length < valve.periodDays) {
      for (let i = valve.daysInfo.length; i < valve.periodDays; ++i) {
        valve.daysInfo.push({day:i, intervals:[]});
      }
    } else if (valve.daysInfo.length > valve.periodDays) {
      valve.daysInfo = valve.daysInfo.slice(0, valve.periodDays);
    }
  }

  addDays(valve) {
    valve.periodDays += 1;
    this.periodDaysChange(valve);
  }

  toggleBDisabled() {
    this.isDisabledB = !this.isDisabledB;
  }

  toggleSDisabled() {
    this.isDisabledS = !this.isDisabledS;
  }

  onSegmentChanged(segmentButton: any) {
    console.log('Segment changed to', segmentButton.currentTarget.value);
  }

  onSegmentSelected(segmentButton: any) {
    console.log('Segment selected', segmentButton.currentTarget.value);
  }

}
