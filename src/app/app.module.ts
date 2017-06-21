import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FirebaseProvider } from '../providers/firebase-provider';
import { MyApp } from './app.component';
import { Geolocation } from '@ionic-native/geolocation';
import { DadosFB } from '../providers/dados-fb';

@NgModule({
  declarations: [
	  MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
        FirebaseProvider,
        DadosFB,
        StatusBar,
	  SplashScreen,
	  Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
