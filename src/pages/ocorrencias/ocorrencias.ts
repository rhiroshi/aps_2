import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase-provider';


@IonicPage()
@Component({
  selector: 'page-ocorrencias',
  templateUrl: 'ocorrencias.html',
})
export class Ocorrencias {

      //o vetor ocorrencias guarda o vetor que será mostrado. Ele será utilizado tambem para filtragem, portanto é necessário ter dois vetores
	public ocorrencias = [];
      //o fullOcorrencias guarda o vetor inteiro de ocorencias
	public fullOcorrencias = [];

      //a pesquisa utiliza as variaveis ao inves do evento porque pode ser filtrada em conjunto
	public pesquisaNome = '';
	public pesquisaEndereco = '';

	constructor(public modal: ModalController, public firebase: FirebaseProvider, public navCtrl: NavController, public navParams: NavParams) {
		this.firebase.database().ref('/pacientes/').on('child_added', (snap) => {
			this.fullOcorrencias.push(snap.val());
			this.buscar();
		});
		this.firebase.database().ref('/pacientes/').on('child_removed', (snap) => {
			this.fullOcorrencias = this.fullOcorrencias.splice(this.fullOcorrencias.indexOf(snap.val()), 1);
			if (this.fullOcorrencias.length == 1) {
				this.fullOcorrencias = [];
			}
			this.buscar();
		});
  }

	abrirOcorrencia(ocorrencia) {
		let modal = this.modal.create('RegistroOcorrencia', { ocorrencia: ocorrencia });
		modal.present();
	}
      

	buscar() {
		//resetar o vetor de ocorrencias que mostra
		this.ocorrencias = this.fullOcorrencias;

		//verifica se a pesquisa ta vazia
		if ( (this.pesquisaNome && this.pesquisaNome.trim()) || (this.pesquisaEndereco && this.pesquisaEndereco.trim()) ) {
			this.ocorrencias = this.ocorrencias.filter( (ocorrencia) => {
				return ( (ocorrencia.nome.toLowerCase().indexOf(this.pesquisaNome.toLowerCase()) > -1 )
					&& (ocorrencia.endereco.toLowerCase().indexOf(this.pesquisaEndereco.toLowerCase()) > -1) ); //adiciona apenas se achar no indexOf
			});
		}
	}

	novaOcorrencia() {
		let modal = this.modal.create('RegistroOcorrencia');
		modal.present();
  }


}
