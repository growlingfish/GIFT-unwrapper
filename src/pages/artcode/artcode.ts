import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

declare var Artcodes: any;

@Component({
  selector: 'page-artcode',
  templateUrl: 'artcode.html',
})
export class ArtcodePage {

  constructor(public nav: NavController, public navParams: NavParams, public platform: Platform) {
    this.platform.ready().then(
      () => {
        if(this.platform.is('cordova')) {
          Artcodes.scan({
            name: "Scan code", actions: [
              { codes: ["1:1:3:3:4"] }, { codes: ["1:1:2:4:4"] }
            ]
          }, code => {
            alert(code);
          });
        }
      }
    );
  }

}
