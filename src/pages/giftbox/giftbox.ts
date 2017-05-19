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
  items: Array<{title: string, sender: string, icon: string, id: number}>;
  currentUser: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private giftboxService: GiftboxServiceProvider, private auth: AuthServiceProvider, private loadingCtrl: LoadingController) {
    this.currentUser = auth.getUserInfo();

    this.showLoading()
    this.giftboxService.loadGifts(this.currentUser.id).subscribe(available => {
      if (available) {
        this.items = [];
        var gifts = giftboxService.getGifts();
        for (let i = 0; i < gifts.length; i++) {
          this.items.push({
            title: gifts[i].title,
            sender: 'from ' + gifts[i].sender,
            icon: ( gifts[i].isWrapped() ? 'mail' : 'mail-open' ),
            id: gifts[i].id
          });
        }
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
      giftId: item.id
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
