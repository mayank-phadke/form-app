import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import { NewFormPage } from '../new-form/new-form';
import { UpdateFormPage } from '../update-form/update-form';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  employee = true;

  constructor(public navCtrl: NavController, private loadingCtrl: LoadingController) {

    let load = loadingCtrl.create({
      content: "Loading, Please Wait"
    })
    load.present();

    firebase.database().ref().child(firebase.auth().currentUser.uid).child("role").once("value", snap => {
      load.dismiss()
      if (snap.val() == "Employee")
        this.employee = true
      else
        this.employee = false
    })

  }

  logout() {
    firebase.auth().signOut();
  }

  new() {
    this.navCtrl.setRoot(NewFormPage, {
      data: false
    });
  }

  update() {
    this.navCtrl.setRoot(UpdateFormPage, {
      approved: 'pending'
    });
  }

  accepted() {
    this.navCtrl.setRoot(UpdateFormPage, {
      approved: true
    });
  }

  rejected() {
    this.navCtrl.setRoot(UpdateFormPage, {
      approved: false
    });
  }

}
