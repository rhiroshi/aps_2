import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase-provider';

@IonicPage()
@Component({
  selector: 'page-registrar',
  templateUrl: 'registrar.html',
})
export class Registrar {

	public email = '';
	public senha = '';

	constructor(public toast: ToastController, public view: ViewController, public firebase: FirebaseProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

	registrar() {
		if ((this.email != '') && (this.senha != '')) {
			this.firebase.auth().createUserWithEmailAndPassword(this.email, this.senha)
				.then(registro => {
					console.log('Registrado : ', registro);
				}).catch(erro => {
					console.log('Erro de registro: ', erro);
					this.toast.create({
						message: 'Erro ao registrar, ' + erro.message,
						position: 'top',
						duration: 3000
					}).present();
				});
			this.view.dismiss();
		} else {
			this.toast.create({
				message: 'Preencha todos os campos!',
				position: 'top',
                        duration: 1500
			}).present();
		}
	}

	cancelar() {
		this.view.dismiss();
	}

}
