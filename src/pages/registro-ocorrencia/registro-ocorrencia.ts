import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase-provider';

@IonicPage()
@Component({
  selector: 'page-registro-ocorrencia',
  templateUrl: 'registro-ocorrencia.html',
})
export class RegistroOcorrencia {

public doencas = ['Selecione'];
public paciente = {
	nome: '',
	doenca: '',
      endereco: ''
}
	public refPacientes = "/pacientes/";


	constructor(public modal: ModalController, public toast: ToastController, public firebase: FirebaseProvider, public navCtrl: NavController, public navParams: NavParams) {
		this.firebase.database().ref("/doencas/").on('child_added', (snap) => {
			this.doencas.push(snap.val());
		});

  }

	public novaDoenca() {
		let modal = this.modal.create('CadastroDoenca');
		modal.onDidDismiss(res => {
		});
		modal.present();
}

	public registrar() {
		let toast = this.toast.create({
			duration: 1500,
			position: 'top',

		});
		if (!this.paciente.nome || !this.paciente.endereco || !this.paciente.doenca) {
			toast.setMessage('Todos os campos devem estar preenchidos!');
			toast.present();
		} else {
			let id = this.firebase.database().ref(this.refPacientes).push().key;
			this.firebase.database().ref(this.refPacientes + id).set(this.paciente).then(res=> {
                        console.log("inserido")
				toast.setMessage("Registrado com sucesso!");
				toast.present();
			}).catch(erro => {
				toast.setMessage(erro.message);
				toast.present();
			});
		}
	  console.log("Registrar: ", this.paciente);
  }

}
