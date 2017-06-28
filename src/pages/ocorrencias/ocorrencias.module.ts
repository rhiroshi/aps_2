import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Ocorrencias } from './ocorrencias';
import { ExpandableHeader } from '../../components/expandable-header/expandable-header';

@NgModule({
  declarations: [
    Ocorrencias,
    ExpandableHeader
  ],
  imports: [
    IonicPageModule.forChild(Ocorrencias),
  ],
  exports: [
	  Ocorrencias,
	  ExpandableHeader
  ]
})
export class OcorrenciasModule {}
