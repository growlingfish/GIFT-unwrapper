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
      if (!this.wraps[i].isComplete()) {
        return true;
      }
    }
    return false;
  }
}

export class Wrap {
  id: number;
  title: string;
  challenges: Array<Challenge>;

  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
    this.challenges = [];
  }

  public setChallenge (id: number, type: string, task: string) {
    this.challenges.push(new Challenge(id, type, task));
  }

  public isComplete () {
    for (let i = 0; i < this.challenges.length; i++) {
      if (!this.challenges[i].completed) {
        return false;
      }
    }
    return true;
  }
}

class Challenge {
  id: number;
  type: string;
  task: string;
  completed: boolean;

  constructor (id: number, type: string, task: string) {
    this.id = id;
    this.type = type;
    this.task = task;
    this.completed = false;
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
                data.gifts[i].wraps[j].ID,
                data.gifts[i].wraps[j].post_title
              );
              if (data.gifts[i].wraps[j].unwrap_date) {
                wrap.setChallenge(data.gifts[i].wraps[j].ID, 'date', data.gifts[i].wraps[j].unwrap_date);
              }
              if (data.gifts[i].wraps[j].unwrap_key) {
                wrap.setChallenge(data.gifts[i].wraps[j].ID, 'key', data.gifts[i].wraps[j].unwrap_key);
              }
              if (data.gifts[i].wraps[j].unwrap_place) {
                wrap.setChallenge(data.gifts[i].wraps[j].ID, 'place', data.gifts[i].wraps[j].unwrap_place);
              }
              if (data.gifts[i].wraps[j].unwrap_artcode) {
                wrap.setChallenge(data.gifts[i].wraps[j].ID, 'artcode', data.gifts[i].wraps[j].unwrap_artcode);
              }
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
    for (let i = 0; i < this.gifts.length; i++) {
      if (this.gifts[i].id == id) {
        return this.gifts[i];
      }
    }
    return null;
  }

  public getWrapWithID (giftId: number, wrapId: number) {
    let gift = this.getGiftWithID(giftId);
    for (let i = 0; i < gift.wraps.length; i++) {
      if (gift.wraps[i].id == wrapId) {
        return gift.wraps[i];
      }
    }
    return null;
  }

}
