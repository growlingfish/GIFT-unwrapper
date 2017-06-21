import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class GlobalVarProvider {

  apiBase: string;
  notificationBase: string;

  constructor() {
    this.apiBase = "https://gifting.dev/wp-json/gift/v1/";
    this.notificationBase = "https://chat.gifting.digital/api/";
  }

  getApiBase () {
    return this.apiBase;
  }

  getNotificationsBase () {
    return this.notificationBase;
  }

  getAuthURL (user, pass) {
    return this.getApiBase() + "auth/" + user + "/" + pass;
  }

  getGiftsURL (userId) {
    return this.getApiBase() + "gifts/" + userId;
  }
}
