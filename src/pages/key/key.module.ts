import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KeyPage } from './key';

@NgModule({
  declarations: [
    KeyPage,
  ],
  imports: [
    IonicPageModule.forChild(KeyPage),
  ],
  exports: [
    KeyPage
  ]
})
export class KeyPageModule {}
