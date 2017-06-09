import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Decibelimetro } from './decibelimetro';

@NgModule({
  declarations: [
    Decibelimetro,
  ],
  imports: [
    IonicPageModule.forChild(Decibelimetro),
  ],
  exports: [
    Decibelimetro
  ]
})
export class DecibelimetroModule {}
