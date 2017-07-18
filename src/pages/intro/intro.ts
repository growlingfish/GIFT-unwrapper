import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

  constructor(public nav: NavController, public navParams: NavParams, private storage: Storage) {
    this.storage.get('introDone').then((introDone) => {
      if (introDone == null) {
        this.storage.set('introDone', true);
      } else {
        this.finishIntro();
      }
    }).catch(
      console.log.bind(console)
    );
  }

  finishIntro () {
    this.nav.setRoot(LoginPage);
  }
}
