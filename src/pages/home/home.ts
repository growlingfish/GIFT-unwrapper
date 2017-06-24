import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { User } from '../../providers/auth-service/auth-service';
import { GiftboxPage } from '../giftbox/giftbox';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  currentUser: User;

  constructor(private nav: NavController, private auth: AuthServiceProvider) {
    this.currentUser = auth.getUserInfo();
  }

  public openGiftbox () {
    this.nav.push(GiftboxPage);
  }
}
