import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { GiftboxServiceProvider } from '../../providers/giftbox-service/giftbox-service';
import { Observable, Subscription } from 'rxjs/Rx';
import { ArtcodePage } from '../artcode/artcode';
import { PersonalPage } from '../personal/personal';
import { KeyPage } from '../key/key';
import { PlacePage } from '../place/place';
import { DatePage } from '../date/date';
import { ObjectPage } from '../object/object';
import { Geolocation } from '@ionic-native/geolocation';
import { GlobalVarProvider } from '../../providers/global-var/global-var';

@Component({
  selector: 'page-wrap',
  templateUrl: 'wrap.html',
})
export class WrapPage {
  giftId: number;
  wrapId: number;
  watch: Subscription;
  
  constructor(public nav: NavController, public navParams: NavParams, private giftboxService: GiftboxServiceProvider, private alertCtrl: AlertController, private geolocation: Geolocation, private globalVar: GlobalVarProvider, public platform: Platform) {
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
          let dateSubscription = Observable.interval(1000).subscribe(x => {
            var today = new Date();
            today.setHours(23);
            today.setMinutes(59);
            today.setSeconds(59);
            var challengeDate = new Date(
              this.giftboxService.getWrapWithID(this.giftId, this.wrapId).challenges[i].task.substring(0,4)
              + '-' +
              this.giftboxService.getWrapWithID(this.giftId, this.wrapId).challenges[i].task.substring(4,6)
              + '-' +
              this.giftboxService.getWrapWithID(this.giftId, this.wrapId).challenges[i].task.substring(6,8)
            );
            if (today.getTime() - challengeDate.getTime() >= 0) {
              this.giftboxService.getWrapWithID(this.giftId, this.wrapId).challenges[i].completeChallenge();
              let alert = this.alertCtrl.create({
                title: 'Well done!',
                subTitle: "You've reached the correct day for your gift to be unwrapped",
                buttons: [
                  {
                    text: 'OK'
                  }
                ]
              });
              alert.present(prompt);
              dateSubscription.unsubscribe();
            }
          });
        } else if (this.giftboxService.getWrapWithID(this.giftId, this.wrapId).challenges[i].type == 'place') {
          if(this.platform.is('cordova')) {
            this.watch = this.geolocation.watchPosition().filter((p) => p.coords !== undefined).subscribe(position => {
              var task = JSON.parse(this.giftboxService.getWrapWithID(this.giftId, this.wrapId).challenges[i].task);
              if (this.globalVar.getDistance(position.coords.latitude, position.coords.longitude, task["lat"], task["lng"]) < this.globalVar.nearThreshold) {
                this.giftboxService.getWrapWithID(this.giftId, this.wrapId).challenges[i].completeChallenge();
                let alert = this.alertCtrl.create({
                  title: 'Well done!',
                  subTitle: "You've found the correct location for your gift to be unwrapped",
                  buttons: [
                    {
                      text: 'OK'
                    }
                  ]
                });
                alert.present(prompt);
                this.watch.unsubscribe();
              }
            });
          }
        }
      }
    }
  }

  getHint (type) {
    switch (type) {
      case 'date':
        return 'Wait for a certain date';
      case 'key':
        return 'Enter a keycode';
      case 'artcode':
        return 'Scan an Artcode';
      case 'place':
        return 'Travel to a location';
      case 'personal':
        return 'A personal request';
      case 'object':
        return 'Find an exhibit';
    }
  }

  getIcon (type) {
    switch (type) {
      case 'date':
        return 'alarm';
      case 'key':
        return 'key';
      case 'artcode':
        return 'image';
      case 'place':
        return 'compass';
      case 'personal':
        return 'heart';
      case 'object':
        return 'cube';
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
      } else if (challenge.type == 'place') {
        this.nav.push(PlacePage, {
          giftId: this.giftId,
          wrapId: this.wrapId
        });
      } else if (challenge.type == 'date') {
        this.nav.push(DatePage, {
          giftId: this.giftId,
          wrapId: this.wrapId
        });
      } else if (challenge.type == 'object') {
        this.nav.push(ObjectPage, {
          giftId: this.giftId,
          wrapId: this.wrapId
        });
      } else {
        console.log("Nothing to do here");
      }
    }
  }

  unwrap () {
    this.nav.pop();
  }

  ionViewWillLeave() {
    this.platform.ready().then(
      () => {
        if(this.platform.is('cordova') && !this.watch.closed) {
          this.watch.unsubscribe();
        }
      }
    );
  }

}
