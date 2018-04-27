import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as firebase from 'firebase';
import { NewFormPage } from '../new-form/new-form';
import { UpdateFormPage } from '../update-form/update-form';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

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
