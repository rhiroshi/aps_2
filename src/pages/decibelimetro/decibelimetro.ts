import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DBMeter } from '@ionic-native/db-meter';


/**
 * Generated class for the Decibelimetro page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-decibelimetro',
  templateUrl: 'decibelimetro.html',
})
export class Decibelimetro {

  public loadProgress = 10;

  public values: Array<number>;
  public avg: number;

  public max: number = 200;
  public showWarning: boolean;
  public dynamic: number = 0;
  public type: string;

  public botao = {
    'nome': 'Start',
    'exec': true,
    'cor': 'secondary'
  };

  public subscription;
  constructor(public dbMeter: DBMeter, public navCtrl: NavController, public navParams: NavParams) {
  }

  executaDcbm() {
    if (this.botao.exec) {
      this.comeca();
      setTimeout(() => {
        this.desativa();
      }, 10000);
    } else {
      this.desativa();
    }
  }

  comeca() {
    this.avg = 0;
    this.botao.exec = false;
    this.botao.nome = 'Stop';
    this.botao.cor = 'danger';
    this.values = [];
    this.dbMeter.start().subscribe(
	    data => {
       this.random(data);
       this.values.push(data);
      }
    );
  }

  lista() {
    this.dbMeter.isListening().then(
      (isListening: boolean) => console.log(isListening)
    );
  }

  desativa() {
    this.botao.exec = true;
    this.botao.nome = 'Start';
    this.botao.cor = 'secondary';
    this.dbMeter.stop().then((data) => {
      let sum = this.values.reduce((previous, current) => current += previous);
      this.avg = sum / this.values.length;
      this.type = this.calculoTipo(this.avg);
      this.dynamic = 0;
      this.deleta();
    });
  }

  deleta() {
    this.dbMeter.delete().then(
      () => console.log("Deleted DB Meter instance")
    );
  }

  public random(data): void {
    let value;
    if (data == null) {
      value = 0;
    } else {
      value = data;
    }

    this.dynamic = value;
  }

  calculoTipo(value) {
    if (value < 25) {
      return 'success';
    } else if (value < 50) {
      return 'info';
    } else if (value < 75) {
      return 'warning';
    } else {
      return 'danger';
    }
  }


}
