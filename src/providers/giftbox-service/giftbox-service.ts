import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalVarProvider } from '../../providers/global-var/global-var';

export class Gift {
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}

@Injectable()
export class GiftboxServiceProvider {

  gifts: Array<Gift>;

  constructor(private globalVar: GlobalVarProvider, public http: Http) {}

  public loadGifts (email) {
    return Observable.create(observer => {
      this.http.get(this.globalVar.getGiftsURL(email))
        .map(response => response.json())
        .subscribe(data => {
          this.gifts = data.gifts;
          console.log(this.gifts);
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
