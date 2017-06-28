import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FirebaseProvider } from '../providers/firebase-provider';
import { DadosFB } from '../providers/dados-fb';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'Tabs';

  constructor(public dados: DadosFB, firebase: FirebaseProvider, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
	  this.dados.iniciarListeners();
	        //verifica se está logado e define a pagina
		  firebase.auth().onAuthStateChanged(user => {
			  console.log(user);
			  this.rootPage = (user) ? 'Tabs' : 'Login';
		  });
	  platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

