import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GiftboxServiceProvider } from '../../providers/giftbox-service/giftbox-service';

@Component({
  selector: 'page-object',
  templateUrl: 'object.html',
})
export class ObjectPage {
  giftId: number;
  wrapId: number;

  constructor(public nav: NavController, public navParams: NavParams, private giftboxService: GiftboxServiceProvider) {
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
    this.nav.pop();
  }

  completeChallenge () {
    for (let i = 0; i < this.giftboxService.getWrapWithID(this.giftId, this.wrapId).challenges.length; i++) {
      if (this.giftboxService.getWrapWithID(this.giftId, this.wrapId).challenges[i].type == 'object') {
        this.giftboxService.getWrapWithID(this.giftId, this.wrapId).challenges[i].completeChallenge();
      }
    }
    this.nav.pop();
  }
}
