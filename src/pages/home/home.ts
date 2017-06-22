import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {FirebaseProvider} from '../../providers/firebase-provider';

/**
 * Generated class for the Home page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class Home {

  public user = {};

  constructor(public firebase: FirebaseProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      this.user = user;
    });
  }

  sair() {
   this.firebase.auth().signOut().then(() => this.navCtrl.setRoot('Login'));
 }

}
