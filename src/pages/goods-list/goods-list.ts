import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderSendPage } from '../order-send/order-send';
import { LoginServiceProvider } from '../../providers/login-service/login-service';

export interface GoodsInterface {
  goodsId: string;
  goodsName: string;
  goodsPrice: string;
  imgPath? :string;
}

@IonicPage()
@Component({
  selector: 'page-goods-list',
  templateUrl: 'goods-list.html',
})
export class GoodsListPage {
  
  goodsList: GoodsInterface[] = [
    {goodsId: '0000001234', goodsName: '[스타벅스] 아메리카노', goodsPrice: '4,100', imgPath: '../assets/imgs/goods1.jpg'},
    {goodsId: '0000001235', goodsName: '[설빙] 팥빙수', goodsPrice: '6,000', imgPath: '../assets/imgs/goods2.jpg'},
    {goodsId: '0000001236', goodsName: '[투썸플레이스] 아메리카노', goodsPrice: '4,900', imgPath: '../assets/imgs/goods3.jpg'},
  ];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private loginService: LoginServiceProvider) {
  }

  ionViewCanEnter(): boolean {
    return this.loginService.isLogin();
  }

  orderSend(goods) {
    this.navCtrl.push(OrderSendPage, {item: goods});
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