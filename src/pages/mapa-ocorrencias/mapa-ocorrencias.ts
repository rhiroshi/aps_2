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

	public posicao = {
		latitude: 0,
		longitude: 0
	};
	public coordenadas;
	public mapa;
	public heatMap;
	public geocoder = new google.maps.Geocoder;
	public showOcorrencias = [];

	constructor(public dados: DadosFB, public alert: AlertController, public toast: ToastController, public firebase: FirebaseProvider, public geo: Geolocation, public navCtrl: NavController, public navParams: NavParams) {
		this.enderecoParaCoord(this.dados.ocorrencias);

		this.geo.getCurrentPosition().then(pos => {
			this.posicao.latitude = pos.coords.latitude;
			this.posicao.longitude = pos.coords.longitude;
			this.coordenadas = new google.maps.LatLng(this.posicao.latitude, this.posicao.longitude);
			this.mapa = new google.maps.Map(document.getElementById('mapaView'), {
				center: this.coordenadas,
				zoom: 16,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				disableDefaultUI: true
			});
			this.atualizaHeatMap();
		});
            

  }

	enderecoParaCoord(array) {
		this.showOcorrencias = [];
		for (let i = 0; i < array.length; i++) {
			this.geocoder.geocode({ address: array[i].endereco }, (res, stats) => {
				this.showOcorrencias.push(res[0].geometry.location);
		      });
		}
		console.log('endereco in', array);
		console.log('endereco trans', this.showOcorrencias);
	}

	filtrar() {
		let alert = this.alert.create({
			message: "Escolha uma doença para filtrar o mapa",
			title: 'Filtro',
			buttons: [{ text: 'cancelar', role: 'cancel' },
				{
					text: 'Filtrar', handler: val => {
						let ocorrenciasFiltro = this.dados.ocorrencias.filter((ocorrencia) => {
							return (ocorrencia.doenca == val); //adiciona apenas se achar no indexOf
						});
						this.enderecoParaCoord(ocorrenciasFiltro);
						this.atualizaHeatMap();
					}
				}]
		});
		for (let i = 0; i < this.dados.doencas.length; i++) {
			alert.addInput({ type: 'radio', value: this.dados.doencas[i], label: this.dados.doencas[i] });
		}
		alert.present();
	}


	abreOcorrencias() {
		this.navCtrl.push('Ocorrencias');
	}

	toggleHeatmap() {
			this.enderecoParaCoord(this.dados.ocorrencias);
		if (this.heatMap) {
		this.heatMap.setMap(this.heatMap.getMap() ? null : this.mapa);
		} else {
			this.atualizaHeatMap();
		}
	}
      

	atualizaHeatMap() {
		this.heatMap = new google.maps.visualization.HeatmapLayer({
			map: this.mapa,
			data: this.showOcorrencias
		});;
	}

	ionViewWillView() {
		this.enderecoParaCoord(this.dados.ocorrencias);
		this.atualizaHeatMap();
	}
}
