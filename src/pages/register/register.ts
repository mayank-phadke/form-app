import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Dialogs } from '@ionic-native/dialogs';
import * as firebase from 'firebase';
import * as admin from "firebase-admin";
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  name: string;
  email: string;
  pass: string;
  confirmPass: string;
  role;
  supervisor = false;
  admin = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private dialogs: Dialogs,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    let loading = loadingCtrl.create({
      content: 'Loading, Please Wait...'
    });
    loading.present();
    firebase.database().ref().child(firebase.auth().currentUser.uid).on('value', snapshot => {
      switch (snapshot.child('role').val().toString()) {
        case 'Admin':
          this.admin = true;
        case 'Supervisor':
          this.supervisor = true;
          break;
      }

      loading.dismiss();
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register() {

    let errMsg = this.validate();

    if (errMsg != true) {
      this.dialogs.alert(errMsg, 'Error');
    } else {
      let toast = this.toastCtrl.create({
        duration: 3000
      });
      let loading = this.loadingCtrl.create({
        content: 'Loading, Please Wait...'
      });
      loading.present();
      firebase.auth().createUserWithEmailAndPassword(this.email.toString(), this.pass.toString())
        .then(_ => {

          firebase.database().ref().child(firebase.auth().currentUser.uid).set({
            name: this.name,
            role: this.role
          }).then(_ => {
            loading.dismiss();
            toast.setMessage('Registration Successful, logged in as new user');
            toast.present();
          }).catch(err => {
            loading.dismiss();
            toast.setMessage(err);
            toast.present();
          })
        }).catch(err => {
          loading.dismiss();
          toast.setMessage(err);
          toast.present();
        })
    }

  }

  validate() {

    let err = '';
    let cont = true;

    if (this.name.trim() == '') {
      err += '\nName cannot be empty'
      cont = false;
    }

    if (this.email.trim() == '') {
      err += '\nEmail cannot be empty'
      cont = false;
    } else if (!this.email.includes('@')) {
      err += '\nInvalid Email'
      cont = false;
    }

    if (this.pass.trim() == '') {
      err += 'Password cannot be empty';
      cont = false;
    } else if (this.pass.length < 8) {
      err += 'Password should be more than 8 characters';
      cont = false;
    } else if (this.pass != this.confirmPass) {
      err += 'Passwords do not match';
      cont = false;
    }

    if (cont)
      return true;
    else
      return err;
  }
}
