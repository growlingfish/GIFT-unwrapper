import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalVarProvider } from '../../providers/global-var/global-var';
import { Storage } from '@ionic/storage';

export class User {
  name: string;
  email: string;
  id: number;

  constructor(name: string, email: string, id: number) {
    this.name = name;
    this.email = email;
    this.id = id;
  }
}

@Injectable()
export class AuthServiceProvider {
  currentUser: User = null;

  constructor (private globalVar: GlobalVarProvider, private http: Http, private storage: Storage) {}

  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // don't have the data yet
      return Observable.create(observer => {
        this.http.get(this.globalVar.getAuthURL(credentials.email, credentials.password))
          .map(response => response.json())
          .subscribe(data => {
            var authed = false;
            if (typeof data.success !== 'undefined' && data.success) {
              this.currentUser = new User(decodeURIComponent(data.name), credentials.email, data.id);
              authed = true;
            }
            observer.next(authed);
            observer.complete();
          },
          function (error) {
            observer.next(false);
            observer.complete();
          });
      });
    }
  }

  public getUserInfo() : User {
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      this.storage.remove('introDone');
      observer.next(true);
      observer.complete();
    });
  }

}
