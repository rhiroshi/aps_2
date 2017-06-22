import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { FirebaseProvider } from '../../providers/firebase-provider';
import { DadosFB } from '../../providers/dados-fb';
declare var google: any;

@IonicPage()
@Component({
  selector: 'page-mapa-ocorrencias',
  templateUrl: 'mapa-ocorrencias.html',
})
export class MapaOcorrencias {
      
	public coordenadas;
	public mapa;
	public heatMap;
	public showOcorrencias = [];

	constructor(public dados: DadosFB, public alert: AlertController, public toast: ToastController, public firebase: FirebaseProvider, public geo: Geolocation, public navCtrl: NavController, public navParams: NavParams) {
		this.geo.getCurrentPosition().then(pos => {
			this.coordenadas = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
			this.mapa = new google.maps.Map(document.getElementById('mapaView'), {
				center: this.coordenadas,
				zoom: 16,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				disableDefaultUI: true
			});
		      this.firebase.database().ref().once('child_added').then(() => {
		            this.showOcorrencias = this.dados.ocorrencias;
		      	this.atualizaHeatMap();
		      });
		});

  }


	filtrar() {
		let alert = this.alert.create({
			message: "Escolha uma doença para filtrar o mapa",
			title: 'Filtro',
			buttons: [{ text: 'cancelar', role: 'cancel' },
				{
					text: 'Filtrar', handler: val => {
						if (val == 0) {
							this.showOcorrencias = this.dados.ocorrencias;
						} else {
							let ocorrenciasFiltro = this.dados.ocorrencias.filter((ocorrencia) => {
								console.log(''+ocorrencia.doenca + ' = ' + val + '?');
							      return (ocorrencia.doenca == val); //adiciona apenas se achar no indexOf
						      });
						      this.showOcorrencias = ocorrenciasFiltro;
						}
						this.atualizaHeatMap();
					}
				}]
		});
		alert.addInput({ type: 'radio', value: '0', label: 'Sem filtro' });
		for (let i = 0; i < this.dados.doencas.length; i++) {
			alert.addInput({ type: 'radio', value: this.dados.doencas[i], label: this.dados.doencas[i] });
		}
		alert.present();
	}


	abreOcorrencias() {
		this.navCtrl.push('Ocorrencias');
	}

	toggleHeatmap() {
		      this.heatMap.setMap(this.heatMap.getMap() ? null : this.mapa);
	}
      

	atualizaHeatMap() {
		console.log('array nao filtrado: ', this.showOcorrencias);
		let ocorrenciasCoord = [];
		for (let i = 0; i < this.showOcorrencias.length; i++) {
			ocorrenciasCoord.push(new google.maps.LatLng(this.showOcorrencias[i].coord.lat, this.showOcorrencias[i].coord.lng));
		}
		console.log('array filtrado : ',ocorrenciasCoord);
		if (!this.heatMap) {
		      this.heatMap = new google.maps.visualization.HeatmapLayer({
			      map: this.mapa,
			      data: ocorrenciasCoord
		      });
		} else {
			this.heatMap.set('data', ocorrenciasCoord);
		}
	}

	ionViewWillView() {
		this.atualizaHeatMap();
	}
}
