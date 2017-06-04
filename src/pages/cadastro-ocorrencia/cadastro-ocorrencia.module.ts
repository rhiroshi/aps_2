import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroOcorrencia } from './cadastro-ocorrencia';

@NgModule({
  declarations: [
    CadastroOcorrencia,
  ],
  imports: [
    IonicPageModule.forChild(CadastroOcorrencia),
  ],
  exports: [
    CadastroOcorrencia
  ]
})
export class CadastroOcorrenciaModule {}
