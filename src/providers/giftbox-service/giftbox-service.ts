import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalVarProvider } from '../../providers/global-var/global-var';

@Injectable()
export class GiftboxServiceProvider {

  constructor(private globalVar: GlobalVarProvider, public http: Http) {}

  public loadGifts (email) {
    return Observable.create(observer => {
      this.http.get(this.globalVar.getGiftsURL(email))
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
