import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { GiftboxPage } from '../giftbox/giftbox';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private nav: NavController, private auth: AuthServiceProvider) {}

  public openGiftbox () {
    this.nav.push(GiftboxPage);
  }

  ionViewWillEnter () {
    if (this.auth.currentUser == null) {
      this.nav.setRoot(LoginPage);
    }
  }
}
