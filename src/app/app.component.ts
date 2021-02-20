import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bankroll-manager';

  constructor() {
      const config = {
        apiKey: 'AIzaSyDGk_crf6zUMfskKZheGRCWWJcU7wUDD9g',
        authDomain: 'bankrollmanager-cc348.firebaseapp.com',
        projectId: 'bankrollmanager-cc348',
        storageBucket: 'bankrollmanager-cc348.appspot.com',
        messagingSenderId: '"232047805572"',
        appId: '1:232047805572:web:fe8afd2e3086c471f36ed1',
        measurementId: "G-9Y9476MSGN"
      };
      firebase.default.initializeApp(config);
      firebase.default.analytics();
    }

}
