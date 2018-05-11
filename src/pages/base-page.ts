import { AlertController } from 'ionic-angular';

export class BasePage {
    constructor(private baseAlertCtrl: AlertController) {
    }

    errAlert(errCode, errMsg) {
        let alert = this.baseAlertCtrl.create({
            title: errCode,
            subTitle: errMsg,
            buttons: ['확인']
        });
        alert.present();
    }
}