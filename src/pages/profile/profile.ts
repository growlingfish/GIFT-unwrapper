import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  registerCredentials = { email: '', password: '' };

  constructor(public nav: NavController, public navParams: NavParams, private auth: AuthServiceProvider) {
  }

  chooseLocal () {
    this.registerCredentials.email = 'localbrighton@gifting.digital';
    this.registerCredentials.password = '31B*CBbd9YS69ElJ3slxSARx';
    this.login();
  }

  chooseOutOfTown () {
    this.registerCredentials.email = 'outoftownbrighton@gifting.digital';
    this.registerCredentials.password = '9u@2W*hvZpZh!lilxkVDWPZ1';
    this.login();
  }

  login () {
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) {
        this.nav.setRoot(HomePage);
      } else {
        this.nav.setRoot(LoginPage);
      }
    },
    error => {
      this.nav.setRoot(LoginPage);
    });
  }

}
