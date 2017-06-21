import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapaOcorrencias } from './mapa-ocorrencias';
@NgModule({
  declarations: [
	  MapaOcorrencias
  ],
  imports: [
    IonicPageModule.forChild(MapaOcorrencias),
  ],
  exports: [
	  MapaOcorrencias
  ]
})
export class MapaOcorrenciasModule {}
