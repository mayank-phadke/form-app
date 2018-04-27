import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string = '';
  password: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, private loadingCtrl: LoadingController) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    let loading = this.loadingCtrl.create({
      content: 'Loading, Please Wait...'
    });
    loading.present();
    let toast = this.toastCtrl.create({
      duration: 2000,
    })
    firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(_ => {
      loading.dismiss();
      toast.setMessage('Login Successful');
      toast.present();
    }).catch(err => {
      loading.dismiss();
      toast.setMessage(err.toString());
      toast.present();
    })
  }
}
