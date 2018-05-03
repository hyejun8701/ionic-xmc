import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { BtobLoginProvider } from '../../providers/btob/btob-login';
import { BtobEventGoodsProvider } from '../../providers/btob/btob-event-goods';
import { environment } from '../../environments/environment';
import { ResResult } from '../../models/res-result';

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
  resResult: ResResult;
  private goodsList: EventGoodsInterface[];
  
  /* goodsList: EventGoodsInterface[] = [
    {goodsId: '0000001234', goodsName: '[스타벅스] 아메리카노', goodsPrice: '4,100', imgPath: '../assets/imgs/goods1.jpg'},
    {goodsId: '0000001235', goodsName: '[설빙] 팥빙수', goodsPrice: '6,000', imgPath: '../assets/imgs/goods2.jpg'},
    {goodsId: '0000001236', goodsName: '[투썸플레이스] 아메리카노', goodsPrice: '4,900', imgPath: '../assets/imgs/goods3.jpg'},
  ]; */
  
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private modalCtrl: ModalController,
              private btobLoginProvider: BtobLoginProvider,
              private btobEventGoodsProvider: BtobEventGoodsProvider,
              private alertCtrl: AlertController
              ) {
    if(btobLoginProvider.isLogin()) {
      this.getGoodsList();
    }
  }

  ionViewCanEnter(): boolean {
    return this.btobLoginProvider.isLogin();
  }

  getGoodsList() {
    this.btobEventGoodsProvider.getEventGoodsList(this.btobLoginProvider.getLoginInfo().memberId)
    .subscribe((res: any) => {
      this.resResult = new ResResult();
      this.resResult.setResCode(res.result_code);
      this.resResult.setResMsg(res.result_msg);

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
      } else {
        let alert = this.alertCtrl.create({
          title: this.resResult.getResCode(),
          subTitle: this.resResult.getResMsg(),
          buttons: ['확인']
        });
        alert.present();
      }
    }, error => {}
    //, () => { this.btobEventGoodsProvider.deleteTokenHeader(); }
  );
  }

  goOrder(goods) {
    let modal = this.modalCtrl.create('OrderSendModalPage', {item: goods});
    // modal.onDidDismiss(data => {
    //   //console.log(data);
    //   if(data != null) {
    //   }
    // });
    modal.present();
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