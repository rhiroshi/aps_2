import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, ModalController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase-provider';

import {Facebook} from '@ionic-native/facebook';
import {Http} from '@angular/http';
import {auth} from 'firebase';

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

  public user = {};

	constructor(public fb: Facebook, public http: Http, public modal: ModalController, public toast: ToastController, public alert: AlertController, public firebase: FirebaseProvider, public navCtrl: NavController, public navParams: NavParams) {

  }

  loginFacebook() {
    let permissions = ['public_profile', 'email'];
    this.fb.login(permissions).then(res => {
      this.user['token'] = res.authResponse.accessToken;
      this.user['id'] = res.authResponse.userID;
      this.user['status'] = 'coonected';
      const tokenCredential = auth.FacebookAuthProvider.credential(res.authResponse.accessToken);

      this.firebase.auth().signInWithCredential(tokenCredential).then(usuario => {
        console.log('usuario logado: ', usuario);
      });
    });
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
