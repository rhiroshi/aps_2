import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FirebaseProvider } from '../providers/firebase-provider';
import { MyApp } from './app.component';
import { Geolocation } from '@ionic-native/geolocation';
import { DadosFB } from '../providers/dados-fb';
import { Camera } from '@ionic-native/camera';
import { DBMeter } from '@ionic-native/db-meter';
import {Facebook} from '@ionic-native/facebook';
import {HttpModule} from '@angular/http';
//import { ProgressbarModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
	  MyApp
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
        DadosFB,
	  Geolocation,
    Facebook,
    DBMeter,
    Camera,
    FirebaseProvider,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
