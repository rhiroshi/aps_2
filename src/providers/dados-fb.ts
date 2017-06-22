import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { FirebaseProvider } from '../providers/firebase-provider';
@Injectable()
export class DadosFB {

	public doencas = [];
	public ocorrencias = [];

	constructor(public firebase: FirebaseProvider) {
		this.iniciarListeners();
  }

  iniciarListeners() {
	  this.firebase.database().ref('/doencas/').on('child_added', (snap) => {
		  this.doencas.push(snap.val());
	  });
	  this.firebase.database().ref('/doencas/').on('child_removed', (snap) => {
		  this.doencas.splice(this.doencas.indexOf(snap.val()), 1);
	  });

	  this.firebase.database().ref('/pacientes/').on('child_added', (snap) => {
		  this.ocorrencias.push(snap.val());

	  });
	  this.firebase.database().ref('/pacientes/').on('child_removed', (snap) => {
		  this.ocorrencias.splice(this.ocorrencias.indexOf(snap.val()), 1);
	  });
  }
      
}
