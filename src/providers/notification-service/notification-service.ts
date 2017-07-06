import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { GlobalVarProvider } from '../../providers/global-var/global-var';
import ParseIni from 'ini-parser';
import { GiftboxServiceProvider } from '../../providers/giftbox-service/giftbox-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Injectable()
export class NotificationServiceProvider {

  typeBook: Object;

  constructor(private globalVar: GlobalVarProvider, public http: Http, private authService: AuthServiceProvider, private giftboxService: GiftboxServiceProvider) {
    this.typeBook = [];
    this.http.get('giftplatform-common/types.ini').map(res =>res.text()).subscribe(data => {
      this.typeBook = ParseIni.parse(data);
    });
  }

  testTypeBook () {
    console.log(this.typeBook);
  }

  getTypeCode (type: string) {
    return this.typeBook['gift'][type];
  }

  checkTypeCode (type: string) {
    return (this.typeBook.hasOwnProperty('gift') && this.typeBook['gift'].hasOwnProperty(type));
  }

  declineResponse (giftId) {
    return Observable.create(observer => {
      if (this.checkTypeCode('responseToGift')) {
        let body = new URLSearchParams();
        body.append('type', this.getTypeCode('responseToGift'));
        body.append('giver', this.giftboxService.getGiftWithID(giftId).sender);
        body.append('receiver', this.authService.currentUser.email);
        body.append('decline', 'No reason');
        this.http.post(this.globalVar.getNotificationsBase(), body)
          .subscribe(data => {
            observer.next(true);
            observer.complete();
          },
          function (error) {
            observer.next(false);
            observer.complete();
          });
      } else {
        observer.next(false);
        observer.complete();
      }
    });
  }

  sendResponse (responseText, giftId) {
      return Observable.create(observer => {
        if (this.checkTypeCode('responseToGift')) {
          console.log("sendReponse / if true");
          let body = new URLSearchParams();
          body.append('type', this.getTypeCode('responseToGift'));
          body.append('giver', this.giftboxService.getGiftWithID(giftId).sender);
          body.append('receiver', this.authService.currentUser.email);
          body.append('responseText', responseText);
          this.http.post(this.globalVar.getNotificationsBase(), body)
            .subscribe(data => {
              observer.next(true);
              this.http.get(this.globalVar.getRespondedURL(giftId))
                .subscribe(data => {
                  observer.next(true);
                  observer.complete();
                },
                function (error) {
                  observer.next(false);
                  observer.complete();
                });
            },
            function (error) {
              console.log(error);
              observer.next(false);
              observer.complete();
            });
        } else {
          console.log("sendReponse / if false");
          observer.next(false);
          observer.complete();
        }
      });
  }

}
