import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { GiftboxServiceProvider } from '../../providers/giftbox-service/giftbox-service';

@Component({
  selector: 'page-key',
  templateUrl: 'key.html',
})
export class KeyPage {
  codeText: string;
  giftId: number;
  wrapId: number;

  constructor(public nav: NavController, public navParams: NavParams, private giftboxService: GiftboxServiceProvider, private alertCtrl: AlertController) {
    this.giftId = navParams.get('giftId');
    this.wrapId = navParams.get('wrapId');
  }

  getChallenge () {
    for (let i = 0; i < this.giftboxService.getWrapWithID(this.giftId, this.wrapId).challenges.length; i++) {
      if (this.giftboxService.getWrapWithID(this.giftId, this.wrapId).challenges[i].type == 'key') {
        return this.giftboxService.getWrapWithID(this.giftId, this.wrapId).challenges[i];
      }
    }
  }

  failChallenge () {
    this.nav.pop();
  }

  tryChallenge () {
    if (this.codeText == this.getChallenge().task) {
      this.getChallenge().completeChallenge();
      this.nav.pop();
    } else {
      let alert = this.alertCtrl.create({
        title: 'Incorrect!',
        subTitle: "That wasn't the correct keycode. Check, then try again.",
        buttons: [
          {
            text: 'OK',
            handler: data => {
              this.nav.pop();
            }
          }
        ]
      });
      alert.present(prompt);
    }
  }

}
