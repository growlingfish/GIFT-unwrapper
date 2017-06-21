import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RespondPage } from './respond';

@NgModule({
  declarations: [
    RespondPage,
  ],
  imports: [
    IonicPageModule.forChild(RespondPage),
  ],
  exports: [
    RespondPage
  ]
})
export class RespondPageModule {}
