import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Decibelimetro } from './decibelimetro';

import { ProgressBar } from '../../components/progress-bar/progress-bar';

@NgModule({
  declarations: [
    Decibelimetro,
    ProgressBar,
  ],
  imports: [
    IonicPageModule.forChild(Decibelimetro)
  ],
  exports: [
    Decibelimetro
  ]
})
export class DecibelimetroModule {}
