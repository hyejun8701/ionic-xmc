import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BtobMemberProvider } from '../../../providers/btob/btob-member';
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
      let alert = this.alertCtrl.create({
        subTitle: '입력하신 비밀번호가 일치하지 않습니다.',
        buttons: [
          {
            text: '확인',
            handler: () => {
              console.log('clicked');
            }
          }
        ]
      });
      
      alert.present();
    } else {
      this.btobMemberProvider.renewPassword(this.memberId, this.password, this.newPassword)
      .subscribe((res: any) => {
        this.resResult = new ResResult(res);
        
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