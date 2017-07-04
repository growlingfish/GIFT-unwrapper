import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { GiftboxServiceProvider } from '../../providers/giftbox-service/giftbox-service';

declare var Artcodes: any;

@Component({
  selector: 'page-artcode',
  templateUrl: 'artcode.html',
})
export class ArtcodePage {
  giftId: number;
  wrapId: number;

  constructor(public nav: NavController, public navParams: NavParams, public platform: Platform, private giftboxService: GiftboxServiceProvider, private alertCtrl: AlertController) {
    this.giftId = navParams.get('giftId');
    this.wrapId = navParams.get('wrapId');

    this.platform.ready().then(
      () => {
        if(this.platform.is('cordova')) {
          Artcodes.scan({
            name: "Scan code", actions: [
              { codes: [this.getChallenge().task] }
            ]
          }, code => {
            console.log(code);
            this.getChallenge().completeChallenge();
            let alert = this.alertCtrl.create({
              title: 'Success!',
              subTitle: "Well done - you've scanned " + this.giftboxService.getGiftWithID(this.giftId).sender + "'s Artcode.",
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
          });
        } else {
          let alert = this.alertCtrl.create({
            title: 'Bad luck',
            subTitle: "You can't use the Artcode scanner when you're using Ionic View or ionic serve",
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
    );
  }

  getChallenge () {
    for (let i = 0; i < this.giftboxService.getWrapWithID(this.giftId, this.wrapId).challenges.length; i++) {
      if (this.giftboxService.getWrapWithID(this.giftId, this.wrapId).challenges[i].type == 'artcode') {
        return this.giftboxService.getWrapWithID(this.giftId, this.wrapId).challenges[i];
      }
    }
  }

}
