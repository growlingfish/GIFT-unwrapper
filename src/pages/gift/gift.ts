import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { GiftboxServiceProvider } from '../../providers/giftbox-service/giftbox-service';
import { Gift } from '../../providers/giftbox-service/giftbox-service';
import { PayloadPage } from '../payload/payload';

@IonicPage()
@Component({
  selector: 'page-gift',
  templateUrl: 'gift.html',
})
export class GiftPage {
  gift: Gift;

  constructor(public nav: NavController, public navParams: NavParams, private giftboxService: GiftboxServiceProvider, private alertCtrl: AlertController) {
    this.gift = this.giftboxService.getGiftWithID(navParams.get('id'));
  }

  wrapTapped(event, wrap) {
    if (wrap.isComplete()) {
      let alert = this.alertCtrl.create({
        title: 'Completed',
        subTitle: 'You have already completed this challenge',
        buttons: ['OK']
      });
      alert.present(prompt);
    } else {
      console.log(wrap);
    }
  }

  viewPayload () {
    if (this.gift.isWrapped()) {
      let alert = this.alertCtrl.create({
        title: 'Fail',
        subTitle: 'This Gift is still wrapped',
        buttons: ['OK']
      });
      alert.present(prompt);
    } else {
      this.nav.push(PayloadPage);
    }
  }
}
