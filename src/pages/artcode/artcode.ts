import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Artcodes } from 'artcodes-scanner';

@IonicPage()
@Component({
  selector: 'page-artcode',
  templateUrl: 'artcode.html',
})
export class ArtcodePage {

  constructor(public nav: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    Artcodes.scan(
      { name: "Scan screen title", actions: [{ codes: ["1:1:3:3:4"] }, { codes: ["1:1:2:4:4"] }] },
      function (code) { alert(code); }
    );
  }

}
