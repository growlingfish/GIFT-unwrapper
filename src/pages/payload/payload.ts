import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { GiftboxServiceProvider } from '../../providers/giftbox-service/giftbox-service';
import { RespondPage } from '../respond/respond';
import { GlobalVarProvider } from '../../providers/global-var/global-var';
import { Http } from '@angular/http';

@Component({
  selector: 'page-payload',
  templateUrl: 'payload.html',
})
export class PayloadPage {
  giftId: number;
  payloadId: number;

  constructor(public nav: NavController, public navParams: NavParams, private giftboxService: GiftboxServiceProvider, public modalCtrl: ModalController, private globalVar: GlobalVarProvider, public http: Http) {
    this.giftId = navParams.get('giftId');
    this.payloadId = navParams.get('payloadId');

    this.http.get(this.globalVar.getUnwrappedURL(this.giftId))
      .subscribe(data => {
        console.log(data);
      },
      function (error) {
        console.log(error);
      });
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
