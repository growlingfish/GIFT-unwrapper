import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalVarProvider } from '../../providers/global-var/global-var';

export class Gift {
  id: number;
  title: string;
  sender: string;
  wraps: Array<Wrap>;

  constructor(id: number, title: string, sender: string) {
    this.id = id;
    this.title = title;
    this.sender = sender;
    this.wraps = [];
  }

  public isWrapped () {
    for (let i = 0; i < this.wraps.length; i++) {
      if (!this.wraps[i].wrapped) {
        return false;
      }
    }
    return true;
  }
}

export class Wrap {
  id: number;
  wrapped: boolean;

  constructor(id: number) {
    this.id = id;
    this.wrapped = true;
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
          this.gifts = [];
          for (let i = 0; i < data.gifts.length; i++) {
            var sender = data.gifts[i].post_author_data;
            var gift = new Gift(
              data.gifts[i].ID,
              data.gifts[i].post_title,
              sender.user_nicename
            );
            for (let j = 0; j < data.gifts[i].wraps.length; j++) {
              var wrap = new Wrap(
                data.gifts[i].wraps[j].ID
              );
              gift.wraps.push(wrap);
            }
            this.gifts.push(gift);
          }
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

  public getGifts () {
    return this.gifts;
  }

  public getGiftWithID (id: number) {
    console.log(id);
    for (let i = 0; i < this.gifts.length; i++) {
      console.log(this.gifts[i].id);
      if (this.gifts[i].id == id) {
        return this.gifts[i];
      }
    }
    return null;
  }

}
