import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ViewController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
declare var google: any;

@IonicPage()
@Component({
  selector: 'page-modal-set-coord',
  templateUrl: 'modal-set-coord.html',
})
export class ModalSetCoord {

	public mapa;


	constructor(public view: ViewController, public alert: AlertController, public gps: Geolocation, public navCtrl: NavController) {
		this.gps.getCurrentPosition().then(pos => {
			let coord = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
		      this.mapa = new google.maps.Map(document.getElementById('mapaView2'), {
			      center: coord,
			      zoom: 16,
			      mapTypeId: google.maps.MapTypeId.ROADMAP,
			      disableDefaultUI: true
			});
			this.mapa.addListener('click', (evento) => {
				let geo = new google.maps.Geocoder;
				let endereco = '';
				geo.geocode({ location: evento.latLng }, (res, status) => {
					endereco = res[0].address_components[1].long_name + ' ' + res[0].address_components[0].long_name + ', ' + res[0].address_components[3].long_name + ', ' + res[0].address_components[4].long_name;
					let alert = this.alert.create({
						title: 'O endereço esta correto? ',
						message: endereco,
						buttons: [{ text: 'Não', role: 'cancel' },
							{
								text: 'Sim', handler: () => {
									this.view.dismiss({ data: { coord: { lat: evento.latLng.lat(), lng: evento.latLng.lng() }, endereco: endereco } });
								}
							}]
					});
					alert.present();
				});
		      });
		});

  }
		public fechar(){
			this.view.dismiss();
		}
      

}
