import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { GiftPage } from '../gift/gift';
import { GiftcardPage } from '../giftcard/giftcard';
import { LogoutPage } from '../logout/logout';
import { GiftboxServiceProvider } from '../../providers/giftbox-service/giftbox-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { User } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-giftbox',
  templateUrl: 'giftbox.html'
})
export class GiftboxPage {
  loading: Loading;
  icons: string[];
  items: Array<{title: string, sender: string, icon: string, id: number}> = [];
  currentUser: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private giftboxService: GiftboxServiceProvider, private auth: AuthServiceProvider, private loadingCtrl: LoadingController) {
    this.currentUser = this.auth.getUserInfo();

    this.showLoading();
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
    if (this.giftboxService.getGiftWithID(item.id).hasGiftcard()) {
      this.navCtrl.push(GiftcardPage, {
        giftId: item.id
      });
    } else {
      this.navCtrl.setRoot(GiftPage, {
        giftId: item.id
      });
    }
  }

  sprint_giftTapped () {
    if (this.giftboxService.getGiftWithID(this.giftboxService.currentGift).hasGiftcard()) {
      this.navCtrl.push(GiftcardPage, {
        giftId: this.giftboxService.getGiftWithID(this.giftboxService.currentGift).id
      });
    } else {
      this.navCtrl.setRoot(GiftPage, {
        giftId: this.giftboxService.getGiftWithID(this.giftboxService.currentGift).id
      });
    }
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  logout () {
    this.navCtrl.push(LogoutPage);
  }

  allGiftsUnwrapped() {
    for (var i = 0; i < this.items.length; i++) {
      //console.log(this.giftboxService.getGiftWithID(this.items[i].id).unwrapped);
      //if (this.giftboxService.getGiftWithID(this.items[i].id).isWrapped()) {
      if (!this.giftboxService.getGiftWithID(this.items[i].id).unwrapped) {
        return false;
      }
    }
    return true; 
  }
}
