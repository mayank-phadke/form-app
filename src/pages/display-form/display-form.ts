import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DisplayFormFormPage } from '../display-form-form/display-form-form';
import { DisplayFormClientPage } from '../display-form-client/display-form-client';
import { DisplayFormSignaturePage } from '../display-form-signature/display-form-signature';

@IonicPage()
@Component({
  selector: 'page-display-form',
  templateUrl: 'display-form.html',
})
export class DisplayFormPage {

  tab1Root = DisplayFormFormPage;
  tab2Root = DisplayFormClientPage;
  tab3Root = DisplayFormSignaturePage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DisplayFormPage');
  }

}
