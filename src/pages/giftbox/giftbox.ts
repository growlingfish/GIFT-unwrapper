import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, LoadingController, Loading } from 'ionic-angular';
import { GiftPage } from '../gift/gift';
import { GiftboxServiceProvider } from '../../providers/giftbox-service/giftbox-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { User } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-giftbox',
  templateUrl: 'giftbox.html'
})
export class GiftboxPage {
  loading: Loading;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  currentUser: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private giftboxService: GiftboxServiceProvider, private auth: AuthServiceProvider, private loadingCtrl: LoadingController) {
    this.currentUser = auth.getUserInfo();

    this.showLoading()
    this.giftboxService.loadGifts(this.currentUser.id).subscribe(available => {
      if (available) {
        console.log("Gifts ready");

    // Let's populate this page with some filler content for funzies
/*    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }*/

      } else {
        console.log("Gifts unavailable");
      }
    },
    error => {
        console.log(error);
    });
  }

  itemTapped(event, item) {
    this.navCtrl.push(GiftPage, {
      item: item
    });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
}
