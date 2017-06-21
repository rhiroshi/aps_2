import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, ModalController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase-provider';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

	public login = {
		email: '',
		senha: ''
	};

	constructor(public modal: ModalController, public toast: ToastController, public alert: AlertController, public firebase: FirebaseProvider, public navCtrl: NavController, public navParams: NavParams) {

  }

  logando() {
    
  }

  logar() {
	  if ((this.login.email != '') && (this.login.senha != '')) {
		  this.firebase.auth().signInWithEmailAndPassword(this.login.email, this.login.senha)
			  .then(logado => {
				  console.log('usuarioi logado: ',logado);
			  })
                    //Se houver erro
			  .catch(erro => {
			  this.toast.create({
				  message: 'Erro ao logar, tente novamente',
				  position: 'top',
				  duration: 3000
			  }).present();
		  })
	  } else {
		  this.toast.create({
			  message: 'Login e Senha devem estar preenchidos!',
			  position: 'top',
			  duration: 1500
		  }).present();
	  }
  }

  registrar() {
	  this.modal.create('Registrar').present();
  }

}
