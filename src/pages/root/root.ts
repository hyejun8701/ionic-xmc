import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { BtobMember } from '../../models/btob-member';
import { BtobLoginProvider } from '../../providers/btob/btob-login';
import { BtobEventGoodsProvider } from '../../providers/btob/btob-event-goods';
import { environment } from '../../environments/environment';

export interface EventGoodsInterface {
  goodsId: string;
  goodsName: string;
  goodsPrice: string;
  goodsImg :string;
}

@IonicPage()
@Component({
  selector: 'page-root',
  templateUrl: 'root.html',
})
export class RootPage {
  btobMember: BtobMember;
  private goodsList: EventGoodsInterface[];
  rootPage = 'GoodsListPage';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private btobLoginProvider: BtobLoginProvider,
              private btobEventGoodsProvider: BtobEventGoodsProvider,
              private modalCtrl: ModalController) {
      if(btobLoginProvider.isLogin()) {
        btobEventGoodsProvider.getEventGoodsList(btobLoginProvider.getLoginInfo().memberId)
        .subscribe((res: any) => {
          //console.log(res);
          if(res.result_code == 'APP_LINK_SUCCESS_S0000') {
            this.goodsList = new Array();
            
            for(let i = 0; i < res.result_data.length; i++) {
              //console.log(res.result_data[i]);
              this.goodsList.push(
                {
                  goodsId: res.result_data[i].goods_id,
                  goodsName: res.result_data[i].goods_name,
                  goodsPrice: res.result_data[i].goods_price,
                  goodsImg: `${environment.uploadPath}` + '/goods/template/' + res.result_data[i].goods_img_name
                }
              );
            }
          }
        });
      }
  }

  orderSend(goods) {
    this.navCtrl.push('OrderSendModalPage', {item: goods});
  }

  ionViewCanEnter(): boolean {
    let isLogin = this.btobLoginProvider.isLogin();
    if(isLogin) {
      this.btobMember = this.btobLoginProvider.getLoginInfo();
      //console.log(this.btobMember);
    }
    return this.btobLoginProvider.isLogin();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RootPage');
  }

  ionViewDidEnter() {
    console.log("ionViewDidEnter RootPage");
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave RootPage');
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave RootPage');
  }

  ionViewWillUnload() {
    console.log('ionViewWillUnload RootPage');
  }
}