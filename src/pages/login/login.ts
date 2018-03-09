import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { BtobMember } from '../../models/btob-member';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ResResult } from '../../models/res-result';

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
              private loginService: LoginServiceProvider,
              private alertCtrl: AlertController,
              private formBuilder: FormBuilder) {
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
      console.log(rememberInfo.memberId);
      console.log(rememberInfo.password);

      this.memberId = rememberInfo.memberId;
      this.password = rememberInfo.password;
      this.doLogin();
    }
  }

  doLogin() {   
    this.loginService.authenticate(this.memberId, this.password)
    .subscribe((data: any) => {
      if(data.result_code == 'APP_LINK_SUCCESS_S0000') {
        this.btobMember = new BtobMember();
        this.btobMember.memberName = data.result_msg.member_name;
        this.btobMember.point = data.result_msg.credit_balance;
      } else {
        this.btobMember = null;
      }
      
      this.loginService.setLoginInfo(this.btobMember);// 응답결과 set
      
      this.resResult = new ResResult();
      this.resResult.setResCode(data.result_code);
      this.resResult.setResMsg(decodeURIComponent((data.result_msg).toString().replace(/\+/g, '%20')));
        
      if(this.loginService.isLogin()) {
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
    });
  }

  lostMemberId() {

  }

  lostPassword() {
    let alert = this.alertCtrl.create({
      title: '비밀번호 요청하기',
      inputs: [
        {type: 'text', name: 'memberID', placeholder: '아이디'},
        {type: 'text', name: 'memberName', placeholder: '이름'},
        {type: 'tel', name: 'mobile', placeholder: '휴대폰번호'}
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
            console.log('Input data:', data);
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