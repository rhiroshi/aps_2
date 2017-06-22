import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase-provider';
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class Home {

     constructor(public firebase: FirebaseProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

      public logout() {
	      this.firebase.auth().signOut();
      }

}
