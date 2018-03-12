import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BtobMemberProvider } from '../../../providers/btob-member/btob-member';
import { ResResult } from '../../../models/res-result';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-renew-password-input-modal',
  templateUrl: 'renew-password-input-modal.html',
})
export class RenewPasswordInputModalPage {
  renewForm : FormGroup;
  memberId: string;
  password:string;
  newPassword: string;
  newPasswordCheck: string;
  resResult: ResResult;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private alertCtrl: AlertController,
              private formBuilder: FormBuilder,
              private btobMemberProvider: BtobMemberProvider
            ) {
              this.memberId = navParams.get('memberId');

      /* form 체크 */
      this.renewForm = this.formBuilder.group({
      password: ['', Validators.required],
      newPassword: ['', Validators.required],
      newPasswordCheck: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RenewPasswordInputModalPage');
  }

  dismiss() {
    if(this.newPassword != this.newPasswordCheck) {

    } else {
      this.btobMemberProvider.renewPassword(this.memberId, this.password, this.newPassword)
      .subscribe((data: any) => {
        this.resResult = new ResResult();
        this.resResult.setResCode(data.result_code);
        this.resResult.setResMsg(decodeURIComponent((data.result_msg).toString().replace(/\+/g, '%20')));
        
        let alert = this.alertCtrl.create({
          title: '비밀번호변경결과',
          subTitle: this.resResult.getResMsg(),
          buttons: [
            {
              text: '확인',
              handler: () => {
                console.log('clicked');
                this.navCtrl.pop();
              }
            }
          ]
        });
        
        alert.present();
      });
    }
  }
}