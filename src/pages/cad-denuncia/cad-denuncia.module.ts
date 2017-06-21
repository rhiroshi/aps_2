import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadDenuncia } from './cad-denuncia';

@NgModule({
  declarations: [
    CadDenuncia,
  ],
  imports: [
    IonicPageModule.forChild(CadDenuncia),
  ],
  exports: [
    CadDenuncia
  ]
})
export class CadDenunciaModule {}
