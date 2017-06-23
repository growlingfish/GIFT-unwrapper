import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { GiftboxServiceProvider } from '../../providers/giftbox-service/giftbox-service';
import { Observable } from 'rxjs/Rx';
import { ArtcodePage } from '../artcode/artcode';
import { PersonalPage } from '../personal/personal';
import { KeyPage } from '../key/key';

@IonicPage()
@Component({
  selector: 'page-wrap',
  templateUrl: 'wrap.html',
})
export class WrapPage {
  giftId: number;
  wrapId: number;
  dateSubscription;

  constructor(public nav: NavController, public navParams: NavParams, private giftboxService: GiftboxServiceProvider, private alertCtrl: AlertController) {
    this.giftId = navParams.get('giftId');
    this.wrapId = navParams.get('wrapId');
  }

  ionViewDidLoad() {
    this.doBackgroundChallenges();
  }

  // check activity challenges
  doBackgroundChallenges () {
    for (let i = 0; i < this.giftboxService.getWrapWithID(this.giftId, this.wrapId).challenges.length; i++) {
      if (!this.giftboxService.getWrapWithID(this.giftId, this.wrapId).challenges[i].completed) {
        if (this.giftboxService.getWrapWithID(this.giftId, this.wrapId).challenges[i].type == 'date') {
          this.dateSubscription = Observable.interval(1000).subscribe(x => {
            var today = new Date();
            today.setHours(0);
            today.setMinutes(0);
            today.setSeconds(0);
            var challengeDate = new Date(
              this.giftboxService.getWrapWithID(this.giftId, this.wrapId).challenges[i].task.substring(0,4)
              + '-' +
              this.giftboxService.getWrapWithID(this.giftId, this.wrapId).challenges[i].task.substring(4,6)
              + '-' +
              this.giftboxService.getWrapWithID(this.giftId, this.wrapId).challenges[i].task.substring(6,8)
            );
            if (today.getTime() - challengeDate.getTime() > 0) {
              this.giftboxService.getWrapWithID(this.giftId, this.wrapId).challenges[i].completeChallenge();
              this.dateSubscription.unsubscribe();
            }
          });
        }
      }
    }
  }

  // deal with action challenges
  challengeTapped (event, challenge) {
    if (challenge.completed) {
      let alert = this.alertCtrl.create({
        title: 'Completed',
        subTitle: 'You have already completed this challenge',
        buttons: ['OK']
      });
      alert.present(prompt);
    } else {
      if (challenge.type == 'artcode') {
        this.nav.push(ArtcodePage, {
          giftId: this.giftId,
          wrapId: this.wrapId
        });
      } else if (challenge.type == 'personal') {
        this.nav.push(PersonalPage, {
          giftId: this.giftId,
          wrapId: this.wrapId
        });
      } else if (challenge.type == 'key') {
        this.nav.push(KeyPage, {
          giftId: this.giftId,
          wrapId: this.wrapId
        });
      } else {
        console.log("Nothing to do here");
      }
    }
  }

}
