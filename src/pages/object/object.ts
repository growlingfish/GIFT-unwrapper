import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { GiftboxServiceProvider } from '../../providers/giftbox-service/giftbox-service';
import { GiftboxPage } from '../../pages/giftbox/giftbox';
import { PayloadPage } from '../payload/payload';
import { GlobalVarProvider } from '../../providers/global-var/global-var';

@Component({
  selector: 'page-object',
  templateUrl: 'object.html',
})
export class ObjectPage {
  giftId: number;
  wrapId: number;

  constructor(public nav: NavController, public navParams: NavParams, private giftboxService: GiftboxServiceProvider, private globalVar: GlobalVarProvider, private alertCtrl: AlertController) {
    this.giftId = navParams.get('giftId');
    this.wrapId = navParams.get('wrapId');
  }

  getExhibit () {
    return this.getChallenge().task;
  }

  getChallenge () {
    for (let i = 0; i < this.giftboxService.getWrapWithID(this.giftId, this.wrapId).challenges.length; i++) {
      if (this.giftboxService.getWrapWithID(this.giftId, this.wrapId).challenges[i].type == 'object') {
        return this.giftboxService.getWrapWithID(this.giftId, this.wrapId).challenges[i];
      }
    }
  }

  failChallenge () {
    if (this.globalVar.sprint) {
      //this.nav.setRoot(GiftboxPage);

      let alert = this.alertCtrl.create({
        title: 'Help!',
        subTitle: "Show the photo to another visitor or member of staff and see if they can help.",
        buttons: ['OK']
      });
      alert.present();
    } else {
      this.nav.pop();
    }
  }

  completeChallenge () {
    for (let i = 0; i < this.giftboxService.getWrapWithID(this.giftId, this.wrapId).challenges.length; i++) {
      if (this.giftboxService.getWrapWithID(this.giftId, this.wrapId).challenges[i].type == 'object') {
        this.giftboxService.getWrapWithID(this.giftId, this.wrapId).challenges[i].completeChallenge();
      }
    }
    if (this.globalVar.sprint) {
      this.nav.setRoot(PayloadPage, {
        giftId: this.giftId
      });
    } else {
      this.nav.pop();
    }
  }
}
