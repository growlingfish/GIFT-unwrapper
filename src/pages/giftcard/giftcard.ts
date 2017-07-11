import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GiftboxServiceProvider } from '../../providers/giftbox-service/giftbox-service';
import { GiftPage } from '../gift/gift';

@Component({
  selector: 'page-giftcard',
  templateUrl: 'giftcard.html',
})
export class GiftcardPage {
  giftId: number;

  constructor(public nav: NavController, public navParams: NavParams, private giftboxService: GiftboxServiceProvider) {
    this.giftId = navParams.get('giftId');
  }

  leaveGiftcard () {
    this.nav.setRoot(GiftPage, {
      giftId: this.giftId
    });
  }

}
