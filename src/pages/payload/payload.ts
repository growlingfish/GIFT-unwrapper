import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { GiftboxServiceProvider } from '../../providers/giftbox-service/giftbox-service';
import { RespondPage } from '../respond/respond';

/**
 * Generated class for the PayloadPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-payload',
  templateUrl: 'payload.html',
})
export class PayloadPage {
  giftId: number;
  payloadId: number;

  constructor(public nav: NavController, public navParams: NavParams, private giftboxService: GiftboxServiceProvider, public modalCtrl: ModalController) {
    this.giftId = navParams.get('giftId');
    this.payloadId = navParams.get('payloadId');
  }

  ionViewWillLeave() {
    if (!this.giftboxService.getGiftWithID(this.giftId).experienced) {
      this.giftboxService.getGiftWithID(this.giftId).experienced = true;
      let modal = this.modalCtrl.create(RespondPage);
      modal.present();
    }
  }
}
