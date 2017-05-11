import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class GlobalVarProvider {

  apiBase: string;

  constructor() {
    this.apiBase = "https://gifting.dev/wp-json/gift/v1/";
  }

  getApiBase () {
    return this.apiBase;
  }

  getAuthURL (user, pass) {
    return this.getApiBase() + "auth/" + user + "/" + pass;
  }

  getGiftsURL (user) {
    return this.getApiBase() + "gifts/" + user;
  }
}
