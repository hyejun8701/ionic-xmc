import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ViewController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BtobMemberProvider } from '../../../providers/btob/btob-member';
import { BtobLoginProvider } from '../../../providers/btob/btob-login';
import { ResResult } from '../../../models/res-result';
import { BasePage } from '../../base-page';
import { BaseProvider } from '../../../providers/base-provider';
import * as CommonTextsKo from '../../../common/common-texts-ko';

@IonicPage()
@Component({
  selector: 'page-password-verify-modal',
  templateUrl: 'password-verify-modal.html',
})
export class PasswordVerifyModalPage extends BasePage {
  form : FormGroup;
  password:string;
  resResult: ResResult;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
              private btobMemberProvider: BtobMemberProvider,
              private btobLoginProvider: BtobLoginProvider,
              private alertCtrl: AlertController,
              private baseProvider: BaseProvider,
              private loadingCtrl: LoadingController) {
    super(alertCtrl);
    this.form = this.formBuilder.group({
      password: ['', Validators.required]
    });
  }

  passwordVerify() {
    this.btobMemberProvider.getMemberInfo(this.btobLoginProvider.getLoginInfo().memberId)
    .subscribe((res: any) => {
      this.resResult = new ResResult(res);

      if(res.result_code == 'APP_LINK_SUCCESS_S0000' && res.result_data.password == this.password) {
        let loader = this.loadingCtrl.create({
          spinner: 'dots',
          content: 'Please wait...',
          duration: 3000
        });
        loader.present();

        setTimeout(() => {
          loader.dismiss();
          this.baseProvider.setRootPage('MemberInfoPage');
          this.navCtrl.pop();
        }, 1500);
      } else {
        this.alert(CommonTextsKo.MSG_ENTERED_DOES_NOT_MATCH);
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordVerifyModalPage');
  }

}