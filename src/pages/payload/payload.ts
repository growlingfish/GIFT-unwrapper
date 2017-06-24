import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { GiftboxServiceProvider } from '../../providers/giftbox-service/giftbox-service';
import { RespondPage } from '../respond/respond';

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
      let modal = this.modalCtrl.create(RespondPage, {
        giftId: this.giftId,
        wrapId: this.payloadId
      });
      modal.present();
    }
  }
}
