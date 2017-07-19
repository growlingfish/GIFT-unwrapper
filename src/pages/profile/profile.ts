import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(public nav: NavController, public navParams: NavParams, private auth: AuthServiceProvider) {
  }

  acceptProfile () {
    //this.storage.set('loginEmail', this.registerCredentials.email);
    //this.auth.login(this.registerCredentials);
    this.nav.setRoot(HomePage);
  }

}
