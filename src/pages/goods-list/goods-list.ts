import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, Refresher, Nav } from 'ionic-angular';
import { BtobLoginProvider } from '../../providers/btob/btob-login';
import { BtobEventGoodsProvider } from '../../providers/btob/btob-event-goods';
import { environment } from '../../environments/environment';
import { ResResult } from '../../models/res-result';
import { BasePage } from '../base-page';
import { BtobMemberCreditProvider } from '../../providers/btob/btob-member-credit';
import * as CommonTextsKo from '../../common/common-texts-ko';

export interface EventGoodsInterface {
  goodsId: string;
  goodsName: string;
  goodsPrice: string;
  goodsImg :string;
}

@IonicPage()
@Component({
  selector: 'page-goods-list',
  templateUrl: 'goods-list.html',
})
export class GoodsListPage extends BasePage {
  resResult: ResResult;
  private goodsList: EventGoodsInterface[];
  @ViewChild(Nav) nav: Nav;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, private btobLoginProvider: BtobLoginProvider,
              private btobEventGoodsProvider: BtobEventGoodsProvider, private alertCtrl: AlertController,
              private btobMemberCreditProvider: BtobMemberCreditProvider
              ) {
    super(alertCtrl);
    if(btobLoginProvider.isLogin()) {
      this.getGoodsList();
    }
  }

  ionViewCanEnter(): boolean {
    return this.btobLoginProvider.isLogin();
  }

  doRefresh(refresher: Refresher) {
    if(this.btobLoginProvider.isLogin()) {
      this.getGoodsList();
      
      this.btobMemberCreditProvider.getPointInfo(this.btobLoginProvider.getLoginInfo().memberId)
      .subscribe((res: any) => {
        //console.log(res);
        console.log('get point info..');

        if(res.result_code == 'APP_LINK_SUCCESS_S0000') {
          this.btobLoginProvider.setCurrPointInfo(res.result_data.credit_balance - res.result_data.ready_credit);
        }
        
        refresher.complete();
      });
    }
  }

  getGoodsList() {
    this.btobEventGoodsProvider.getEventGoodsList(this.btobLoginProvider.getLoginInfo().memberId)
    .subscribe((res: any) => {
      console.log('get goods list..');
      this.resResult = new ResResult(res);

      if(res.result_code == 'APP_LINK_SUCCESS_S0000') {
        this.goodsList = new Array();
        
        for(let i = 0; i < res.result_data.length; i++) {
          this.goodsList.push(
            {
              goodsId: res.result_data[i].goods_id,
              goodsName: res.result_data[i].goods_name,
              goodsPrice: res.result_data[i].goods_price,
              goodsImg: (res.result_data[i].goods_img_name != null) ? `${environment.uploadPath}` + '/goods/template/' + res.result_data[i].goods_img_name : null
            }
          );
        }
      } else {
        this.alert(CommonTextsKo.LBL_GET_LIST_FAILED, this.resResult.getResMsg());
      }
    }, error => {}
  );
  }

  goOrder(goods) {
    let modal = this.modalCtrl.create('OrderSendModalPage', {item: goods});

    modal.onDidDismiss(data => {
      console.log(JSON.stringify(this.nav));
    });

    modal.present();
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter GoodsListPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GoodsListPage');
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave GoodsListPage');
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave GoodsListPage');
  }

  ionViewWillUnload() {
    console.log('ionViewWillUnload GoodsListPage');
  }
}