import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { BtobLoginProvider } from '../../providers/btob/btob-login';
import { BasePage } from '../base-page';
import { ResResult } from '../../models/res-result';
import { BtobMemberProvider } from '../../providers/btob/btob-member';
import * as CommonTextsKo from '../../common/common-texts-ko';

@IonicPage()
@Component({
  selector: 'page-member-info',
  templateUrl: 'member-info.html',
})
export class MemberInfoPage extends BasePage {
  renewForm : FormGroup;
  password:string;
  newPassword: string;
  newPasswordCheck: string;
  resResult: ResResult;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private authProvider: AuthProvider,
              private btobLoginProvider: BtobLoginProvider,
              private alertCtrl: AlertController,
              private btobMemberProvider: BtobMemberProvider,
              private loadingCtrl: LoadingController) {
    super(alertCtrl);

    /* form 체크 */
    this.renewForm = this.formBuilder.group({
      password: ['', Validators.required],
      newPassword: ['', Validators.required],
      newPasswordCheck: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MemberInfoPage');
  }

  updateMemberInfo() {
    this.authProvider.auth(
      this.btobLoginProvider.getLoginInfo().memberId,
      'C',
      ''
    ).subscribe((res: any) => {
      console.log(res)
      
      if(res.result_code == 'APP_LINK_SUCCESS_S0000') {
        let alert = this.alertCtrl.create({
          title: CommonTextsKo.MSG_ENTER_AUTH_NUM,
          inputs: [{type: 'number', name: 'authNum', placeholder: CommonTextsKo.LBL_AUTH_NUM}],
          buttons: [
            {
              text: CommonTextsKo.LBL_OK,
              handler: data => {
              if(!data.authNum) {
                return false;
              } else {
                this.authProvider.auth(
                  this.btobLoginProvider.getLoginInfo().memberId,
                  'V',
                  data.authNum
                ).subscribe((res: any) => {
                  this.resResult = new ResResult(res);

                  if(res.result_code == 'APP_LINK_SUCCESS_S0000') {
                    this.btobMemberProvider.renewPassword(this.btobLoginProvider.getLoginInfo().memberId, this.password, this.newPassword)
                    .subscribe((res: any) => {
                      this.resResult = new ResResult(res);
                      if(res.result_code == 'APP_LINK_SUCCESS_S0000') {
                        let alert = this.alertCtrl.create({
                          subTitle: CommonTextsKo.MSG_UPDATE_MEMBER_INFO_SUCC,
                          buttons: [
                            {
                              text: '확인',
                              handler: () => {
                                this.navCtrl.setRoot('GoodsListPage');
                              }
                            }
                          ]
                        });
                        
                        alert.present();
                      } else {
                        this.alert(this.resResult.getResMsg());
                      }
                    });
                  } else {
                    this.alert(CommonTextsKo.MSG_AUTH_NUM_VERIFY_FAILED);
                  }
                }, err => {
                  this.alert(CommonTextsKo.MSG_AUTH_NUM_VERIFY_FAILED);
                });
              }
            }
          },
          {text: CommonTextsKo.LBL_CANCEL, role: 'cancel'}
        ],
          enableBackdropDismiss: false
        });

        let loader = this.loadingCtrl.create({
          spinner: 'dots',
          content: 'Please wait...',
          duration: 3000
        });
        loader.present();

        setTimeout(() => {
          loader.dismiss();
          alert.present();
        }, 1500);
      }
    }, err => {
      console.error(JSON.stringify(err));
      this.alert(CommonTextsKo.MSG_AUTH_NUM_CREATE_FAILED);
    });
  }
}