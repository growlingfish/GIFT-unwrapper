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
  payloads: Array<Payload>;
  received: boolean;
  unwrapped: boolean;
  responded: boolean;

  constructor(id: number, title: string, sender: string, received: boolean, unwrapped: boolean, responded: boolean) {
    this.id = id;
    this.title = title;
    this.sender = sender;
    this.wraps = [];
    this.payloads = [];
    this.received = received;
    this.unwrapped = unwrapped;
    this.responded = responded;
  }

  public isWrapped () {
    if (this.unwrapped) {
      return false;
    }
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

  public setChallenge (type: string, task: string) {
    this.challenges.push(new Challenge(type, task));
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

export class Payload {
  id: number;
  title: string;
  content: string;

  constructor(id: number, title: string, content: string) {
    this.id = id;
    this.title = title;
    this.content = content;
  }
}

class Challenge {
  type: string;
  task: string;
  completed: boolean;

  constructor (type: string, task: string) {
    this.type = type;
    this.task = task;
    this.completed = false;
  }

  completeChallenge () {
    this.completed = true;
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
              sender.user_nicename,
              data.gifts[i].status['received'],
              data.gifts[i].status['unwrapped'],
              data.gifts[i].status['responded']
            );
            for (let j = 0; j < data.gifts[i].wraps.length; j++) {
              var wrap = new Wrap(
                data.gifts[i].wraps[j].ID,
                data.gifts[i].wraps[j].post_title
              );
              if (data.gifts[i].wraps[j].unwrap_date) {
                wrap.setChallenge('date', data.gifts[i].wraps[j].unwrap_date);
              }
              if (data.gifts[i].wraps[j].unwrap_place) {
                wrap.setChallenge('place', data.gifts[i].wraps[j].unwrap_place);
              }
              if (data.gifts[i].wraps[j].unwrap_object) {
                wrap.setChallenge('object', data.gifts[i].wraps[j].unwrap_object);
              }
              if (data.gifts[i].wraps[j].unwrap_personal) {
                wrap.setChallenge('personal', data.gifts[i].wraps[j].unwrap_personal);
              }
              if (data.gifts[i].wraps[j].unwrap_key) {
                wrap.setChallenge('key', data.gifts[i].wraps[j].unwrap_key);
              }
              if (data.gifts[i].wraps[j].unwrap_artcode) {
                wrap.setChallenge('artcode', data.gifts[i].wraps[j].unwrap_artcode);
              }
              gift.wraps.push(wrap);
            }
            for (let j = 0; j < data.gifts[i].payloads.length; j++) {
              var payload = new Payload(
                data.gifts[i].payloads[j].ID,
                data.gifts[i].payloads[j].post_title,
                data.gifts[i].payloads[j].post_content
              );
              gift.payloads.push(payload);
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
