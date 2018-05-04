import { Component } from '@angular/core';
import { NavController, LoadingController, Platform, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';
import { NewFormPage } from '../new-form/new-form';
import { UpdateFormPage } from '../update-form/update-form';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  showNew = true;
  showPending = true;
  showAccepted = true;
  showRejected = true;

  constructor(public navCtrl: NavController, private loadingCtrl: LoadingController, private platform: Platform, private toastCtrl: ToastController) {

    let exit: boolean = false;

    let load = loadingCtrl.create({
      content: "Loading, Please Wait"
    })
    load.present();

    firebase.database().ref().child(firebase.auth().currentUser.uid).child("role").once("value", snap => {
      load.dismiss()
      if (snap.val() == "Employee") {
        this.showNew = true;
        this.showPending = true;
        this.showAccepted = true;
        this.showRejected = true;
      } else if (snap.val() == "Supervisor") {
        this.showNew = false;
        this.showPending = true;
        this.showAccepted = true;
        this.showRejected = true;
      } else if (snap.val() == "Admin") {
        this.showNew = false;
        this.showPending = false;
        this.showAccepted = true;
        this.showRejected = false;
      }
    })

    platform.registerBackButtonAction(_ => {

      if (exit)
        platform.exitApp()
      else {
        exit = true
        toastCtrl.create({
          message: "Press back again to exit",
          duration: 2000
        }).present()
        setTimeout(() => {
          exit = false
        }, 2000);
      }

    })

  }

  logout() {
    firebase.auth().signOut();
  }

  new() {
    this.navCtrl.push(NewFormPage, {
      data: false
    });
  }

  update() {
    this.navCtrl.push(UpdateFormPage, {
      approved: 'pending'
    });
  }

  accepted() {
    this.navCtrl.push(UpdateFormPage, {
      approved: true
    });
  }

  rejected() {
    this.navCtrl.push(UpdateFormPage, {
      approved: false
    });
  }

}
