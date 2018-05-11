import { AlertController, AlertOptions } from 'ionic-angular';
import * as CommonTextsKo from '../common/common-texts-ko';

export class BasePage {
    constructor(private alertController: AlertController, private opts: AlertOptions = {}) {
    }

    alert(title: string, subTitle?: string) {
        this.opts.title = title;

        if(subTitle != null && subTitle != '') {
            this.opts.subTitle = subTitle;
        }

        this.opts.buttons = [CommonTextsKo.LBL_OK];

        let alert = this.alertController.create(this.opts);
        alert.present();
    }
}