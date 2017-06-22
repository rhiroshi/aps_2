import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalSetCoord } from './modal-set-coord';

@NgModule({
  declarations: [
    ModalSetCoord,
  ],
  imports: [
    IonicPageModule.forChild(ModalSetCoord),
  ],
  exports: [
    ModalSetCoord
  ]
})
export class ModalSetCoordModule {}
