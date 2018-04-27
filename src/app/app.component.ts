import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { firebaseConfig } from '../firebaseConfig';
import * as firebase from 'firebase';
import * as admin from 'firebase-admin';

import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('myNav') navCtrl: Nav;
  rootPage: any = LoginPage;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    loadingCtrl: LoadingController
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    firebase.initializeApp(firebaseConfig);

    let load = loadingCtrl.create({
      content: 'Loading, Please Wait'
    });
    load.present();
    firebase.auth().onAuthStateChanged(user => {
      load.dismiss();
      if (user) {
        this.navCtrl.setRoot(TabsPage);
      } else {
        this.navCtrl.setRoot(LoginPage);
      }
    })
  }
}