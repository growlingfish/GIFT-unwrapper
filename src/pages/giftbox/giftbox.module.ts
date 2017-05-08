import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GiftboxPage } from './giftbox';

@NgModule({
  declarations: [
    GiftboxPage,
  ],
  imports: [
    IonicPageModule.forChild(GiftboxPage),
  ],
  exports: [
    GiftboxPage
  ]
})
export class GiftboxPageModule {}
