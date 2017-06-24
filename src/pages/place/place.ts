import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { GiftboxServiceProvider } from '../../providers/giftbox-service/giftbox-service';
import { GlobalVarProvider } from '../../providers/global-var/global-var';

//http://plugins.telerik.com/cordova/plugin/mapbox
declare var Mapbox;

@Component({
  selector: 'page-place',
  templateUrl: 'place.html',
})
export class PlacePage {
  giftId: number;
  wrapId: number;

  constructor(public nav: NavController, public navParams: NavParams, public platform: Platform, private geolocation: Geolocation, private giftboxService: GiftboxServiceProvider, private globalVar: GlobalVarProvider, private alertCtrl: AlertController) {
    this.giftId = navParams.get('giftId');
    this.wrapId = navParams.get('wrapId');
  }

  ionViewDidLoad() {
    this.platform.ready().then(
      () => {
        if(this.platform.is('cordova')) {
          Mapbox.show(
              {
                style: 'emerald', // light|dark|emerald|satellite|streets , default 'streets'
                margins: {
                    left: 0, // default 0
                    right: 0, // default 0
                    top: 20, // default 0
                    bottom: 50 // default 0
                },
                center: { // optional, without a default
                    lat: 52.3702160,
                    lng: 4.8951680
                },
                zoomLevel: 12, // 0 (the entire world) to 20, default 10
                showUserLocation: true, // your app will ask permission to the user, default false
                hideAttribution: false, // default false, Mapbox requires this default if you're on a free plan
                hideLogo: false, // default false, Mapbox requires this default if you're on a free plan
                hideCompass: false, // default false
                disableRotation: false, // default false
                disableScroll: false, // default false
                disableZoom: false, // default false
                disablePitch: false, // disable the two-finger perspective gesture, default false
                markers: [
                    {
                        lat: 52.3732160,
                        lng: 4.8941680,
                        title: 'Nice location',
                        subtitle: 'Really really nice location'
                    }
                ]
            },

            // optional success callback
            function (msg) {
                console.log("Success :) " + JSON.stringify(msg));
            },

            // optional error callback
            function (msg) {
                alert("Error :( " + JSON.stringify(msg));
            }
          );

          let watch = this.geolocation.watchPosition().filter((p) => p.coords !== undefined).subscribe(position => {
            var task = JSON.parse(this.getChallenge().task);
            if (this.globalVar.getDistance(position.coords.latitude, position.coords.longitude, task["lat"], task["lng"]) < this.globalVar.nearThreshold) {
              this.getChallenge().completeChallenge();
              watch.unsubscribe();
              let alert = this.alertCtrl.create({
                title: 'Arrived',
                subTitle: "You've arrived at the place where you can unwrap your gift",
                buttons: [
                  {
                    text: 'OK',
                    handler: data => {
                      this.nav.pop();
                    }
                  }
                ]
              });
              alert.present(prompt);
            }
          });
        }
      }
    );
  }

  getChallenge () {
    for (let i = 0; i < this.giftboxService.getWrapWithID(this.giftId, this.wrapId).challenges.length; i++) {
      if (this.giftboxService.getWrapWithID(this.giftId, this.wrapId).challenges[i].type == 'place') {
        return this.giftboxService.getWrapWithID(this.giftId, this.wrapId).challenges[i];
      }
    }
  }

  ionViewWillLeave() {
    this.platform.ready().then(
      () => {
        if(this.platform.is('cordova')) {
          Mapbox.hide(
              {},
              function(msg) {
                  console.log("Mapbox successfully hidden");
              }
          );
        }
      }
    );
  }

}
