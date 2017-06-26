import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GiftboxServiceProvider } from '../../providers/giftbox-service/giftbox-service';

@Component({
  selector: 'page-date',
  templateUrl: 'date.html',
})
export class DatePage {
  giftId: number;
  wrapId: number;

  constructor(public nav: NavController, public navParams: NavParams, private giftboxService: GiftboxServiceProvider) {
    this.giftId = navParams.get('giftId');
    this.wrapId = navParams.get('wrapId');
  }

  getChallengeDate () {
    var task = this.getChallenge().task;
    var challengeDate = new Date(
      task.substring(0,4)
      + '-' +
      task.substring(4,6)
      + '-' +
      task.substring(6,8)
    );
    return challengeDate.toDateString();
  }

  getChallenge () {
    for (let i = 0; i < this.giftboxService.getWrapWithID(this.giftId, this.wrapId).challenges.length; i++) {
      if (this.giftboxService.getWrapWithID(this.giftId, this.wrapId).challenges[i].type == 'date') {
        return this.giftboxService.getWrapWithID(this.giftId, this.wrapId).challenges[i];
      }
    }
  }

  failChallenge () {
    this.nav.pop();
  }

}
