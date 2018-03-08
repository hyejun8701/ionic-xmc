import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { BtobMember } from '../../models/btob-member';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm : FormGroup;
  memberId: string;
  password: string;
  btobMember: BtobMember;
  saveId: boolean;
  rememberMe: boolean;

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
      this.loginService.authenticate(rememberInfo.memberId, rememberInfo.password);
      
      if(this.loginService.isLogin()) {
        this.memberId = rememberInfo.memberId;
        this.password = rememberInfo.password;
      }
    }
  }

  doLogin() {
    

    this.loginService.authenticate(this.memberId, this.password);
    if(this.loginService.isLogin()) {
      this.navCtrl.setRoot('RootPage');

      if(this.saveId) {
        localStorage.setItem('memberId', this.memberId);
      } else {
        localStorage.removeItem('memberId');
      }

      if(this.rememberMe) {
        let info = {
          memberId: this.memberId,
          password: this.password
        }
        localStorage.setItem('rememberMe', JSON.stringify(info));
      } else {
        localStorage.removeItem('rememberMe');
      }
    } else {
      let alert = this.alertCtrl.create({
        title: '로그인실패',
        subTitle: '입력하신 정보가 일치하지 않습니다.',
        buttons: ['확인']
      });
      alert.present();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ionViewDidEnter() {
    console.log("ionViewDidEnter LoginPage");
    if(this.loginService.isLogin()) {
      this.navCtrl.setRoot('RootPage');
    }
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave LoginPage');
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave LoginPage');
  }

  ionViewWillUnload() {
    console.log('ionViewWillUnload LoginPage');
  }
}