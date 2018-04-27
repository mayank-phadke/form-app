import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { data } from "../../environment/environment";
@IonicPage()
@Component({
  selector: 'page-display-form-form',
  templateUrl: 'display-form-form.html',
})
export class DisplayFormFormPage {

  data = data.employee;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DisplayFormFormPage');
  }

}
