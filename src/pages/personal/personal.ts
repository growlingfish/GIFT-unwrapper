import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GiftboxServiceProvider } from '../../providers/giftbox-service/giftbox-service';

@IonicPage()
@Component({
  selector: 'page-personal',
  templateUrl: 'personal.html',
})
export class PersonalPage {
  
  giftId: number;
  wrapId: number;
  
  constructor(public nav: NavController, public navParams: NavParams, private giftboxService: GiftboxServiceProvider) {
    this.giftId = navParams.get('giftId');
    this.wrapId = navParams.get('wrapId');
  }

  getChallenge () {
    for (let i = 0; i < this.giftboxService.getWrapWithID(this.giftId, this.wrapId).challenges.length; i++) {
      if (this.giftboxService.getWrapWithID(this.giftId, this.wrapId).challenges[i].type == 'personal') {
        return this.giftboxService.getWrapWithID(this.giftId, this.wrapId).challenges[i].task;
      }
    }
  }

  failChallenge () {
    this.nav.pop();
  }

  completeChallenge () {
    for (let i = 0; i < this.giftboxService.getWrapWithID(this.giftId, this.wrapId).challenges.length; i++) {
      if (this.giftboxService.getWrapWithID(this.giftId, this.wrapId).challenges[i].type == 'personal') {
        this.giftboxService.getWrapWithID(this.giftId, this.wrapId).challenges[i].completeChallenge();
      }
    }
    this.nav.pop();
  }
}
