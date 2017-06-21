import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GiftboxServiceProvider } from '../../providers/giftbox-service/giftbox-service';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private giftboxService: GiftboxServiceProvider) {
    this.giftId = navParams.get('giftId');
  }
}
