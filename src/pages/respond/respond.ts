import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading, ViewController } from 'ionic-angular';
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

  constructor(public nav: NavController, public navParams: NavParams, public viewCtrl: ViewController, private giftboxService: GiftboxServiceProvider, public loadingCtrl: LoadingController, private notificationService: NotificationServiceProvider) {
    this.giftId = navParams.get('giftId');
    this.payloadId = navParams.get('payloadId');
  }

  declineResponse () {
    this.notificationService.declineResponse().subscribe(success => {
      console.log(success);
      this.hideLoading();
    },
    error => {
        console.log(error);
        this.hideLoading();
    });
  }

  sendResponse () {
    this.showLoading();
    this.notificationService.sendResponse(this.responseText).subscribe(success => {
      console.log(success);
      this.hideLoading();
    },
    error => {
        console.log(error);
        this.hideLoading();
    });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  hideLoading() {
    this.viewCtrl.dismiss();
  }
}
