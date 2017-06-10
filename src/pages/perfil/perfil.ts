import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase-provider';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class Perfil {

	public usuario = {
		nome: 'Teste',
		img: 'http://piq.codeus.net/static/media/userpics/piq_139461_400x400.png',
		endereco: 'Rua teste',
            email: 'email@teste.com'
	};
     

	constructor(public firebase: FirebaseProvider, public navCtrl: NavController, public navParams: NavParams) {

      }
	logout() {
		this.firebase.auth().signOut();
	}

}
