import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { GiftPage } from '../pages/gift/gift';
import { GiftboxPage } from '../pages/giftbox/giftbox';
import { PayloadPage } from '../pages/payload/payload';
import { WrapPage } from '../pages/wrap/wrap';
import { ArtcodePage } from '../pages/artcode/artcode';
import { LogoutPage } from '../pages/logout/logout';
import { RespondPage } from '../pages/respond/respond';
import { PersonalPage } from '../pages/personal/personal';
import { KeyPage } from '../pages/key/key';
import { PlacePage } from '../pages/place/place';
import { RegisterPage } from '../pages/register/register';
import { DatePage } from '../pages/date/date';
import { ObjectPage } from '../pages/object/object';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { GlobalVarProvider } from '../providers/global-var/global-var';
import { GiftboxServiceProvider } from '../providers/giftbox-service/giftbox-service';
import { NotificationServiceProvider } from '../providers/notification-service/notification-service';
import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GiftPage,
    GiftboxPage,
    PayloadPage,
    WrapPage,
    ArtcodePage,
    LogoutPage,
    LoginPage,
    RespondPage,
    PersonalPage,
    KeyPage,
    PlacePage,
    RegisterPage,
    DatePage,
    ObjectPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot()
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
    ArtcodePage,
    LogoutPage,
    RespondPage,
    PersonalPage,
    KeyPage,
    PlacePage,
    RegisterPage,
    DatePage,
    ObjectPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    GlobalVarProvider,
    GiftboxServiceProvider,
    NotificationServiceProvider,
    Geolocation 
  ]
})
export class AppModule {}
