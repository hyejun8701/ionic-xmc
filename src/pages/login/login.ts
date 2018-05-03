import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { BtobMember } from '../../models/btob-member';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResResult } from '../../models/res-result';
import { BtobMemberProvider } from '../../providers/btob/btob-member';
import { BtobLoginProvider } from '../../providers/btob/btob-login';

import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm : FormGroup;
  memberId: string;
  password: string;
  saveId: boolean;
  rememberMe: boolean;
  resResult: ResResult;
  btobMember: BtobMember;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private alertCtrl: AlertController,
              private formBuilder: FormBuilder,
              private btobLoginProvider: BtobLoginProvider,
              private btobMemberProvider: BtobMemberProvider,
              private loadingCtrl: LoadingController) {
    console.log('constructor LoginPage');

    /* form 체크 */
    this.loginForm = this.formBuilder.group({
      memberId: ['', Validators.required],
      password: ['', Validators.required]
    });

    /* 아이디저장 */
    const saveInfo = localStorage.getItem('memberId');
    if(saveInfo != null && saveInfo != "") {
      this.saveId = true;
      this.memberId = saveInfo;
    }
    
    /* 자동로그인 */
    const rememberInfo = JSON.parse(localStorage.getItem('rememberMe'));
    if(rememberInfo != null && rememberInfo != "") {
      this.rememberMe = true;
      //console.log(rememberInfo.memberId);
      //console.log(rememberInfo.password);

      this.memberId = rememberInfo.memberId;
      this.password = rememberInfo.password;
      this.doLogin('A');
    }
  }

  doLogin(loginType: string) {
    this.btobLoginProvider.authenticate(this.memberId, this.password, loginType)
    .subscribe((res: any) => {
      if(res.result_code == 'APP_LINK_SUCCESS_S0000' && res.access_token != null) {
        this.btobMember = new BtobMember();
        this.btobMember.memberId = res.result_data.member_id;
        this.btobMember.memberName = res.result_data.member_name;
        this.btobMember.point = res.result_data.credit_balance;
        this.btobMember.lastLoginDate = res.result_data.last_login_date;

        if(res.refresh_token != null) {
          localStorage.setItem('refreshToken', res.refresh_token);
        }

        localStorage.setItem('accessToken', res.access_token);
      } else {
        this.btobMember = null;
      }
      
      this.btobLoginProvider.setLoginInfo(this.btobMember);// 응답결과 set
      
      this.resResult = new ResResult();
      this.resResult.setResCode(res.result_code);
      this.resResult.setResMsg(res.result_msg);
        
      if(this.btobLoginProvider.isLogin()) {
        let loader = this.loadingCtrl.create({
          content: "Please wait..."
        });
        loader.present();

        setTimeout(() => {
          this.navCtrl.setRoot('RootPage');
    
          if(this.saveId) {
            localStorage.setItem('memberId', this.memberId);
          } else {
            localStorage.removeItem('memberId');
          }
    
          if(this.rememberMe) {
            localStorage.setItem('rememberMe', JSON.stringify({'memberId': this.memberId, 'password': this.password}));
          } else {
            localStorage.removeItem('rememberMe');
          }

          const last = moment(new Date(this.btobMember.lastLoginDate)).add(-1, 'days').format('YYYY-MM-DD');
          const curr = moment(new Date()).add(-3, 'month').format('YYYY-MM-DD');

          //console.log(last);
          //console.log(curr);

          if(moment.utc(last).isBefore(curr)) {
            let alert = this.alertCtrl.create({
              //title: '로그인 후 3개월 기간경과 시 비밀번호 변경',
              message: '고객님의 소중한 정보를 위하여<br/>비밀번호를 변경하여 주세요.',
              buttons: [
                {
                  text: '다음에',
                  handler: () => {
                    console.log('Disagree clicked');
                  }
                },
                {
                  text: '지금 변경하기',
                  handler: () => {
                    console.log('Agree clicked');
                    this.navCtrl.push('RenewPasswordInputModalPage', {'memberId': this.memberId});
                  }
                }
              ]
            });
        
            alert.present();
          }

          loader.dismiss();
        }, 1500);

      } else {
        let alert = this.alertCtrl.create({
          title: '로그인실패',
          subTitle: this.resResult.getResMsg(),
          buttons: ['확인']
        });
        alert.present();
      }
    },
    err => {
      console.log(err);
      let alert = this.alertCtrl.create({
        title: '로그인실패',
        subTitle: '서버에서 에러가 발생했습니다.<br/>잠시후 다시 시도해 주세요.',
        buttons: ['확인']
      });
      alert.present();
    });
  }

  /* lostMemberId() {

  } */

  lostPassword() {
    let alert = this.alertCtrl.create({
      title: '비밀번호 요청하기',
      inputs: [
        {type: 'text', name: 'memberId', placeholder: '아이디'},
        {type: 'text', name: 'memberName', placeholder: '이름'},
        {type: 'tel', name: 'chargeMobile', placeholder: '휴대폰번호'}
      ],
      buttons:[
        /* {
          text: '취소',
          role: 'cancel',
          handler: data => {
          }
        }, */
        {
          text: '관리자에게 정보 요청하기',
          handler: data => {
            //console.log('Input data:', data);
            if(!data.memberId || !data.memberName || data.chargeMobile) {
              return false;
            } else {
              this.btobMemberProvider.lostPassword(data.memberId, data.memberName, data.chargeMobile)
              .subscribe((res: any) => {
                //console.log(data);
                this.resResult = new ResResult();
                this.resResult.setResCode(res.result_code);
                this.resResult.setResMsg(res.result_msg);
                
                let alert = this.alertCtrl.create({
                  title: '비밀번호요청결과',
                  subTitle: this.resResult.getResMsg(),
                  buttons: [
                    {text: '확인'}
                  ]
                });
                
                alert.present();
              });
            }
          }
        }
      ]
    });

    alert.present();
  }

  /* ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ionViewDidEnter() {
    console.log("ionViewDidEnter LoginPage");
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave LoginPage');
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave LoginPage');
  }

  ionViewWillUnload() {
    console.log('ionViewWillUnload LoginPage');
  } */
}