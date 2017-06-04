import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Teste } from './teste';

@NgModule({
  declarations: [
    Teste,
  ],
  imports: [
    IonicPageModule.forChild(Teste),
  ],
  exports: [
    Teste
  ]
})
export class TesteModule {}
