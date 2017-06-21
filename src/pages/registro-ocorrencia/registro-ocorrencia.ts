import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController, AlertController, ViewController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase-provider';

@IonicPage()
@Component({
  selector: 'page-registro-ocorrencia',
  templateUrl: 'registro-ocorrencia.html',
})
export class RegistroOcorrencia {
      
public mostraCadastro = true;
public doencas = [];
public paciente = {
            id : null,
		nome: '',
		doenca: '',
		endereco: ''
	};
public id;
	public refPacientes = "/pacientes/";


	constructor(public view: ViewController, public alert: AlertController, public modal: ModalController, public toast: ToastController, public firebase: FirebaseProvider, public navCtrl: NavController, public navParams: NavParams) {
		if (this.navParams.get('ocorrencia')) {
			this.paciente = this.navParams.get('ocorrencia');
		}
		this.firebase.database().ref("/doencas/").on('child_added', (snap) => {
			this.doencas.push(snap.val());
		});
		this.firebase.database().ref('/doencas/').on('child_removed', (snap) => {
			this.doencas.splice(this.doencas.indexOf(snap.val().nome), 1);
		});
  }

	public excluir() {
		this.firebase.database().ref('pacientes/' + this.paciente.id.toString()).remove().then(res => {
			this.toast.create({
				message: 'Excluido com sucesso',
				duration: 1500,
				position: 'top'
			}).present();
			this.view.dismiss();
		});
	}

	public fechar() {
		this.view.dismiss();
	}

	public novaDoenca() {
		let alert = this.alert.create({
			title: 'Nova doença',
			inputs: [{
				name: 'nome',
                        placeholder: 'Nome da doença'
			}],
			buttons: [{
				text: 'Cancelar',
                        role:'cancel'
			}, {
					text: 'Cadastrar',
					handler: dados => {
						let doenca = dados.nome;
						this.firebase.database().ref("/doencas/").push(doenca).then(res => {
							this.toast.create({
								message: 'Doença cadastrada com sucesso',
								duration: 1500,
								position: 'top'
							}).present();
						}).catch(erro => {
							this.toast.create({
								message: erro.message,
								duration: 1500,
								position: 'top'
							}).present();
						});
					}
			}]
		});
		alert.present();
}

	public registrar() {
		let toast = this.toast.create({
			duration: 1500,
			position: 'top',

		});
		if (!this.paciente.nome || !this.paciente.endereco || !this.paciente.doenca) {
			toast.setMessage('Todos os campos devem estar preenchidos!');
			toast.present();
		} else if (this.paciente.id != null) { // Se for atualização, vai entra aqui!!
			this.firebase.database().ref(this.refPacientes + this.paciente.id).set(this.paciente).then(res => {
				toast.setMessage('Atualizado com sucesso!');
				toast.present();
				this.view.dismiss();
			}).catch(erro => {
				toast.setMessage(erro.message);
				toast.present();
			});
		} else { // Se for um novo registro, vai entrar aqui!
			let id = this.firebase.database().ref(this.refPacientes).push().key;
			this.paciente.id = id;
			this.firebase.database().ref(this.refPacientes + id).set(this.paciente).then(res=> {
				toast.setMessage("Registrado com sucesso!");
				toast.present();
				this.view.dismiss();
			}).catch(erro => {
				toast.setMessage(erro.message);
				toast.present();
			});
		}
  }

}
