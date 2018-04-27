import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { data } from "../../environment/environment";

@IonicPage()
@Component({
  selector: 'page-display-form-client',
  templateUrl: 'display-form-client.html',
})
export class DisplayFormClientPage {

  data = data.client;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DisplayFormClientPage');
  }

}
