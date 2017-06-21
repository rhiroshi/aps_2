import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-cad-denuncia',
  templateUrl: 'cad-denuncia.html',
})
export class CadDenuncia {
	public options: CameraOptions = {
		quality: 95,
		destinationType: this.camera.DestinationType.DATA_URL,
		encodingType: this.camera.EncodingType.JPEG,
		mediaType: this.camera.MediaType.PICTURE
	};
	public imagem;		
 	constructor(public camera: Camera) {}

 	capturar() {	
		this.camera.getPicture(this.options).then(
			(imageData) => this.imagem = 'data:image/jpeg;base64,' + imageData,
			(err) => console.log(err)
		);
	}

	registrar() {

	}
  

}
