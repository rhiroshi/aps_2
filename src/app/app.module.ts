import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FirebaseProvider } from '../providers/firebase-provider';
import { MyApp } from './app.component';
import { Camera } from '@ionic-native/camera';

import { DBMeter } from '@ionic-native/db-meter';

//import { ProgressbarModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
    //ProgressbarModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
<<<<<<< HEAD
    DBMeter,
    FirebaseProvider,
=======
      Camera,
      FirebaseProvider,
>>>>>>> b18834fe3d98fd53727ea3ce16d1ca7e1018e8d9
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
