import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';
import { GiftboxServiceProvider } from '../../providers/giftbox-service/giftbox-service';
import { NotificationServiceProvider } from '../../providers/notification-service/notification-service';

@IonicPage()
@Component({
  selector: 'page-respond',
  templateUrl: 'respond.html',
})
export class RespondPage {
  giftId: number;
  payloadId: number;
  responseText: string;

  constructor(public nav: NavController, public navParams: NavParams, public viewCtrl: ViewController, private giftboxService: GiftboxServiceProvider, public loadingCtrl: LoadingController, private notificationService: NotificationServiceProvider) {
    this.giftId = navParams.get('giftId');
    this.payloadId = navParams.get('payloadId');
  }

  declineResponse () {
    this.viewCtrl.dismiss();
  }

  sendResponse () {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
    this.notificationService.sendResponse(this.responseText);
    this.viewCtrl.dismiss();
  }
}
