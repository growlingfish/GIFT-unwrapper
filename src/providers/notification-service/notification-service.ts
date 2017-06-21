import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalVarProvider } from '../../providers/global-var/global-var';

@Injectable()
export class NotificationServiceProvider {

  constructor(private globalVar: GlobalVarProvider, public http: Http) {}

  sendResponse (responseText) {
    return Observable.create(observer => {
      this.http.post(this.globalVar.getNotificationsBase())
        .map(response => response.json())
        .subscribe(data => {
          console.log(data);
        })
    });
  }

}
