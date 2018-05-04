import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { data } from "../../environment/environment";
import * as firebase from 'firebase';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-display-form-signature',
  templateUrl: 'display-form-signature.html',
})
export class DisplayFormSignaturePage {

  showFooter = false;

  data = {
    client_signature: '',
    emp_signature: ''
  };
  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private toastCtrl: ToastController) {

    let loading = loadingCtrl.create({
      content: 'Loading, Please Wait...'
    });
    loading.present();

    firebase.database().ref().child(firebase.auth().currentUser.uid).on('value', snapshot => {
      if (snapshot.child('role').val() == 'Supervisor' && navParams.get('approved') == 'pending')
        this.showFooter = true;
      else
        this.showFooter = false;

      loading.dismiss();
    })

    this.data = data.signature;
    console.log(this.data);
  }

  ionViewDidLoad() {
    this.data = data.signature;
    console.log('ionViewDidLoad DisplayFormSignaturePage');
  }

  approve(value) {
    let loading = this.loadingCtrl.create({
      content: 'Loading, Please Wait'
    })

    loading.present();
    let toast = this.toastCtrl.create({
      duration: 2000
    });

    firebase.database().ref().once('value', snapshot => {
      snapshot.forEach(childSnap => {

        let ref = childSnap.child('forms').child(data.key);
        if (ref.exists()) {
          ref.ref.child('approved').set(value).then(_ => {
            loading.dismiss();
            if (value)
              toast.setMessage("Application Approved");
            else
              toast.setMessage("Application Rejected");
            toast.present();
            this.navCtrl.setRoot(HomePage);
          })
            .catch(err => {
              loading.dismiss();
              toast.setMessage(err);
              toast.present();
            })
        }

        return false;
      })
    })
  }
}
