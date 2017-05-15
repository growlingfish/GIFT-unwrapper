import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GiftboxServiceProvider } from '../../providers/giftbox-service/giftbox-service';
import { Gift } from '../../providers/giftbox-service/giftbox-service';

@IonicPage()
@Component({
  selector: 'page-gift',
  templateUrl: 'gift.html',
})
export class GiftPage {
  gift: Gift;

  constructor(public navCtrl: NavController, public navParams: NavParams, private giftboxService: GiftboxServiceProvider) {
    this.gift = this.giftboxService.getGiftWithID(navParams.get('id'));
  }

  ionViewDidLoad() {
    console.log(this.gift);
  }

}
