import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistroOcorrencia } from './registro-ocorrencia';

@NgModule({
  declarations: [
    RegistroOcorrencia,
  ],
  imports: [
    IonicPageModule.forChild(RegistroOcorrencia),
  ],
  exports: [
    RegistroOcorrencia
  ]
})
export class RegistroOcorrenciaModule {}
