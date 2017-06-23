import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GiftboxServiceProvider } from '../../providers/giftbox-service/giftbox-service';

@IonicPage()
@Component({
  selector: 'page-key',
  templateUrl: 'key.html',
})
export class KeyPage {

  codeText: string;
  giftId: number;
  wrapId: number;

  constructor(public nav: NavController, public navParams: NavParams, private giftboxService: GiftboxServiceProvider) {
    this.giftId = navParams.get('giftId');
    this.wrapId = navParams.get('wrapId');
  }

  getChallenge () {
    for (let i = 0; i < this.giftboxService.getWrapWithID(this.giftId, this.wrapId).challenges.length; i++) {
      if (this.giftboxService.getWrapWithID(this.giftId, this.wrapId).challenges[i].type == 'key') {
        return this.giftboxService.getWrapWithID(this.giftId, this.wrapId).challenges[i].task;
      }
    }
  }

  failChallenge () {
    this.nav.pop();
  }

  tryChallenge () {
    for (let i = 0; i < this.giftboxService.getWrapWithID(this.giftId, this.wrapId).challenges.length; i++) {
      if (this.giftboxService.getWrapWithID(this.giftId, this.wrapId).challenges[i].type == 'key') {
        this.giftboxService.getWrapWithID(this.giftId, this.wrapId).challenges[i].completeChallenge();
        console.log("To do: actually check the code ...");
      }
    }
    this.nav.pop();
  }

}
