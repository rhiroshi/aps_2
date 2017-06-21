import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-tabs',
	templateUrl: 'tabs.html',
})
export class Tabs {

	public tab1Root: any = 'Home';
	public tab2Root: any = 'MapaOcorrencias';
	public tab3Root: any = 'Perfil';

	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}


}
