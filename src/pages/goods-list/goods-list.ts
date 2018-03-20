import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { OrderSendPage } from '../order-send/order-send';
import { LoginProvider } from '../../providers/login/login';
import { BtobEventGoodsProvider } from '../../providers/btob-event-goods/btob-event-goods';
import { BtobMember } from '../../models/btob-member';
import { environment } from '../../environments/environment';

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
export class GoodsListPage {
  private btobMember: BtobMember;
  private goodsList: EventGoodsInterface[];
  
  /* goodsList: EventGoodsInterface[] = [
    {goodsId: '0000001234', goodsName: '[스타벅스] 아메리카노', goodsPrice: '4,100', imgPath: '../assets/imgs/goods1.jpg'},
    {goodsId: '0000001235', goodsName: '[설빙] 팥빙수', goodsPrice: '6,000', imgPath: '../assets/imgs/goods2.jpg'},
    {goodsId: '0000001236', goodsName: '[투썸플레이스] 아메리카노', goodsPrice: '4,900', imgPath: '../assets/imgs/goods3.jpg'},
  ]; */
  
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private loginProvider: LoginProvider,
              private btobEventGoodsProvider: BtobEventGoodsProvider,
              private modalCtrl: ModalController
              ) {
    btobEventGoodsProvider.getEventGoodsList(loginProvider.getLoginInfo().memberId)
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

  ionViewCanEnter(): boolean {
    return this.loginProvider.isLogin();
  }

  orderSend(goods) {
    // let modal = this.modalCtrl.create('OrderSendModalPage');
    //   modal.present();

    this.navCtrl.push('OrderSendModalPage', {item: goods});
    //this.navCtrl.push(OrderSendPage, {item: goods});
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