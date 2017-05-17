import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { GiftPage } from '../pages/gift/gift';
import { GiftboxPage } from '../pages/giftbox/giftbox';
import { PayloadPage } from '../pages/payload/payload';
import { WrapPage } from '../pages/wrap/wrap';
import { LogoutPage } from '../pages/logout/logout';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { GlobalVarProvider } from '../providers/global-var/global-var';
import { GiftboxServiceProvider } from '../providers/giftbox-service/giftbox-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GiftPage,
    GiftboxPage,
    PayloadPage,
    WrapPage,
    LogoutPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    GiftPage,
    GiftboxPage,
    PayloadPage,
    WrapPage,
    LogoutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    GlobalVarProvider,
    GiftboxServiceProvider
  ]
})
export class AppModule {}
