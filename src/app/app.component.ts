import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FirebaseProvider } from '../providers/firebase-provider';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'Login';

  constructor(firebase: FirebaseProvider, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
	  platform.ready().then(() => {
              //verifica se está logado e define a pagina
		  firebase.auth().onAuthStateChanged(user => {
			  console.log(user);
			  this.rootPage = (user) ? 'Teste' : 'Login';
		  });
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

