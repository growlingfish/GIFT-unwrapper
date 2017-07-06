import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { GiftboxServiceProvider } from '../../providers/giftbox-service/giftbox-service';
import { PayloadPage } from '../payload/payload';
import { WrapPage } from '../wrap/wrap';
import { GlobalVarProvider } from '../../providers/global-var/global-var';
import { Http } from '@angular/http';

@Component({
  selector: 'page-gift',
  templateUrl: 'gift.html',
})
export class GiftPage {
  giftId: number;

  constructor(public nav: NavController, public navParams: NavParams, private giftboxService: GiftboxServiceProvider, private alertCtrl: AlertController, private globalVar: GlobalVarProvider, public http: Http) {
    this.giftId = navParams.get('giftId');

    this.http.get(this.globalVar.getReceivedURL(this.giftId))
      .subscribe(data => {
        console.log(data);
      },
      function (error) {
        console.log(error);
      });
  }

  wrapTapped(event, wrap) {
    if (wrap.isComplete()) {
      let alert = this.alertCtrl.create({
        title: 'Completed',
        subTitle: 'You have already completed this set of challenges',
        buttons: ['OK']
      });
      alert.present(prompt);
    } else {
      this.nav.push(WrapPage, {
        giftId: this.giftId,
        wrapId: wrap.id
      });
    }
  }

  viewPayloads () {
    if (this.giftboxService.getGiftWithID(this.giftId).isWrapped()) {
      let alert = this.alertCtrl.create({
        title: 'Fail',
        subTitle: 'This Gift is still wrapped',
        buttons: ['OK']
      });
      alert.present(prompt);
    } else {
      this.nav.push(PayloadPage, {
        giftId: this.giftId
      });
    }
  }
}
