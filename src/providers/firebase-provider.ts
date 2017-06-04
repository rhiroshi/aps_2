import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseProvider {

	constructor() {
		let config = {
			apiKey: "AIzaSyAM_a3l4Q-39fDDsDouvKHqFHJzYCwDsbA",
			authDomain: "aps-2-20006.firebaseapp.com",
			databaseURL: "https://aps-2-20006.firebaseio.com",
			projectId: "aps-2-20006",
			storageBucket: "aps-2-20006.appspot.com",
			messagingSenderId: "307920566514"
		};
		firebase.initializeApp(config);
	}

    database() {
        return firebase.database();
    }

    auth() {
        return firebase.auth();
    }

}
