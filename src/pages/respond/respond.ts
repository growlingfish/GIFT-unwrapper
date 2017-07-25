import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { GiftboxServiceProvider } from '../../providers/giftbox-service/giftbox-service';
import { NotificationServiceProvider } from '../../providers/notification-service/notification-service';

@Component({
  selector: 'page-respond',
  templateUrl: 'respond.html',
})
export class RespondPage {
  giftId: number;
  payloadId: number;
  responseText: string;
  loading: Loading;

  constructor(public nav: NavController, public navParams: NavParams, private giftboxService: GiftboxServiceProvider, public loadingCtrl: LoadingController, private notificationService: NotificationServiceProvider) {
    this.giftId = navParams.get('giftId');
    this.payloadId = navParams.get('payloadId');
  }

  declineResponse () {
    this.notificationService.declineResponse(this.giftId).subscribe(success => {
      console.log(success);
      this.nav.pop();
    },
    error => {
      console.log(error);
      this.nav.pop();
    });
  }

  sendResponse () {
    this.showLoading();
    this.notificationService.sendResponse(this.responseText, this.giftId).subscribe(success => {
      console.log(success);
      this.loading.dismiss();
      this.nav.pop();
    },
    error => {
      console.log(error);
      this.loading.dismiss();
      this.nav.pop();
    });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true,
      duration: 5000
    });
    this.loading.present();
  }

  responseComplete() {
    return typeof(this.responseText) != 'undefined' && this.responseText.length > 0;
  }
}
