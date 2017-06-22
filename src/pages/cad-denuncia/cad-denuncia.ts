import { Component } from '@angular/core';
import { IonicPage, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
declare var google: any;

@IonicPage()
@Component({
  selector: 'page-cad-denuncia',
  templateUrl: 'cad-denuncia.html',
})
export class CadDenuncia {
	//referente a localizacao
	public mapa;
	public latitude;
	public longitude;
	public coordenadas;
	public endereco = "";
	public i = 0;


	//referente a foto
	captureDataUrl: string;	

	public options: CameraOptions = {
		quality: 50,
		destinationType: this.camera.DestinationType.DATA_URL,
		encodingType: this.camera.EncodingType.JPEG,
		mediaType: this.camera.MediaType.PICTURE
	};
	public imagem;		
 	constructor(public camera: Camera, public geolocation: Geolocation, public alertCtrl: AlertController) {
 		this.alertCtrl = alertCtrl;
 		this.localizar();

 	}


 	// Funcoes referente a camera e imagem 
//------------------------------------------------------------------------------------------
 	capturar() {	
		this.camera.getPicture(this.options).then(
			(imageData) => this.imagem = 'data:image/jpeg;base64,' + imageData,
			(err) => console.log(err)
		);
		this.minhaPosicao();
	}

	

	registrar() {
		//tem que criar a rotina ainda
	}


	upload() {
	    let storageRef = firebase.storage().ref();

	    const filename = Math.floor(Date.now() / 1000);

	    const imageRef = storageRef.child(`images/${filename}.jpg`);

	    imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL).then((snapshot)=> {
	      this.Alert();
    });

  }

  Alert() {
    let alert = this.alertCtrl.create({
      title: 'Uploaded!',
      subTitle: 'Foto salva no Firebase',
      buttons: ['OK']
    });
    alert.present();

    this.captureDataUrl = "";
  }

  // Funcoes referente Localizacao
//------------------------------------------------------------------------------------------

 	minhaLocalizacao() {
		this.geolocation.getCurrentPosition().then(
			position => {
				this.latitude = position.coords.latitude;
				this.longitude = position.coords.longitude;

			}		
		).catch(error => console.log(error));
	}

	abrirMapa() {
		this.coordenadas = new google.maps.LatLng(this.latitude, this.longitude);

		this.mapa = new google.maps.Map(document.getElementById('mapaView'), {
			center: this.coordenadas,
			zoom: 17,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			disableDefaultUI: true
		});	
	}

	localizar() {
		this.geolocation.getCurrentPosition().then(
			position => {
				this.latitude = position.coords.latitude;
				this.longitude = position.coords.longitude;
				this.abrirMapa();

			}		
		).catch(error => console.log(error));

		
	}

	minhaPosicao() {
		let marker = new google.maps.Marker({
			map: this.mapa,
			animation: google.maps.Animation.DROP,
			position: this.coordenadas
		})
		this.informacoes();
		marker.addListener('click', () => {
			this.informacoes();
		});
	}


	informacoes() {
		this.i++;
		let geo = new google.maps.Geocoder;
		geo.geocode({ location: this.coordenadas }, (res, status) => {
			if (status == google.maps.GeocoderStatus.OK) {
				this.endereco = res[0].formatted_address;
				this.endereco += " [" + this.i + "]"
			}
		});
	}
  

}
