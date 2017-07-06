import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { GiftboxServiceProvider } from '../../providers/giftbox-service/giftbox-service';
import { RespondPage } from '../respond/respond';
import { GlobalVarProvider } from '../../providers/global-var/global-var';
import { Http } from '@angular/http';
import { NotificationServiceProvider } from '../../providers/notification-service/notification-service';

@Component({
  selector: 'page-payload',
  templateUrl: 'payload.html',
})
export class PayloadPage {
  giftId: number;
  payloadId: number;

  constructor(public nav: NavController, public navParams: NavParams, private giftboxService: GiftboxServiceProvider, public modalCtrl: ModalController, private globalVar: GlobalVarProvider, public http: Http, private notificationService: NotificationServiceProvider) {
    this.giftId = navParams.get('giftId');
    this.payloadId = navParams.get('payloadId');

    if (!this.giftboxService.getGiftWithID(this.giftId).unwrapped) {
      this.http.get(this.globalVar.getUnwrappedURL(this.giftId))
        .subscribe(data => {
          console.log(data);
        },
        function (error) {
          console.log(error);
        });
      this.notificationService.giftUnwrapped(this.giftId).subscribe(success => {
        console.log(success);
      },
      error => {
        console.log(error);
      });
    }
  }

  ionViewWillLeave() {
    if (!this.giftboxService.getGiftWithID(this.giftId).unwrapped) {
      this.giftboxService.getGiftWithID(this.giftId).unwrapped = true;
      let modal = this.modalCtrl.create(RespondPage, {
        giftId: this.giftId,
        wrapId: this.payloadId
      });
      modal.present();
    }
  }

  leaveGift() {
    this.nav.popToRoot();
  }
}
