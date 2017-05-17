import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WrapPage } from './wrap';

@NgModule({
  declarations: [
    WrapPage,
  ],
  imports: [
    IonicPageModule.forChild(WrapPage),
  ],
  exports: [
    WrapPage
  ]
})
export class WrapPageModule {}
