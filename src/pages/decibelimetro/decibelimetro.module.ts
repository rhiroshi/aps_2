import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Decibelimetro } from './decibelimetro';

import { ProgressBar } from '../../components/progress-bar/progress-bar';
import { ProgressbarModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    Decibelimetro,
    ProgressBar,
  ],
  imports: [
    IonicPageModule.forChild(Decibelimetro),
    ProgressbarModule.forRoot(),
  ],
  exports: [
    Decibelimetro
  ]
})
export class DecibelimetroModule {}
