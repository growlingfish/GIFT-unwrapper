import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArtcodePage } from './artcode';

@NgModule({
  declarations: [
    ArtcodePage,
  ],
  imports: [
    IonicPageModule.forChild(ArtcodePage),
  ],
  exports: [
    ArtcodePage
  ]
})
export class ArtcodePageModule {}
