import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PayloadPage } from './payload';

@NgModule({
  declarations: [
    PayloadPage,
  ],
  imports: [
    IonicPageModule.forChild(PayloadPage),
  ],
  exports: [
    PayloadPage
  ]
})
export class PayloadPageModule {}
