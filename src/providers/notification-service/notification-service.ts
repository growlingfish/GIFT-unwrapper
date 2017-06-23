import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { GlobalVarProvider } from '../../providers/global-var/global-var';
import ParseIni from 'ini-parser';

@Injectable()
export class NotificationServiceProvider {

  typeBook: Object;

  constructor(private globalVar: GlobalVarProvider, public http: Http) {
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

  createGift () {
    if (this.checkTypeCode('createdGift')) {
      let body = new URLSearchParams();
      body.append('type', this.getTypeCode('createdGift'));
      return Observable.create(observer => {
        this.http.post(this.globalVar.getNotificationsBase(), body)
          .map(response => response.json())
          .subscribe(data => {
            console.log(data);
            observer.next(true);
            observer.complete();
          },
          function (error) {
            observer.next(false);
            observer.complete();
          });
      });
    }
  }

  declineResponse () {
    if (this.checkTypeCode('responseToGift')) {
      let body = new URLSearchParams();
      body.append('type', this.getTypeCode('responseToGift'));
      body.append('decline', 'No reason');
      return Observable.create(observer => {
        this.http.post(this.globalVar.getNotificationsBase(), body)
          .map(response => response.json())
          .subscribe(data => {
            console.log(data);
            observer.next(true);
            observer.complete();
          },
          function (error) {
            observer.next(false);
            observer.complete();
          });
      });
    }
  }

  sendResponse (responseText) {
    if (this.checkTypeCode('responseToGift')) {
      let body = new URLSearchParams();
      body.append('type', this.getTypeCode('responseToGift'));
      body.append('responseText', responseText);
      return Observable.create(observer => {
        this.http.post(this.globalVar.getNotificationsBase(), body)
          .map(response => response.json())
          .subscribe(data => {
            console.log(data);
            observer.next(true);
            observer.complete();
          },
          function (error) {
            observer.next(false);
            observer.complete();
          });
      });
    }
  }

}
