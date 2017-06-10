import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroDoenca } from './cadastro-doenca';

@NgModule({
  declarations: [
    CadastroDoenca,
  ],
  imports: [
    IonicPageModule.forChild(CadastroDoenca),
  ],
  exports: [
    CadastroDoenca
  ]
})
export class CadastroDoencaModule {}
